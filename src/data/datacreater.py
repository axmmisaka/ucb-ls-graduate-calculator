# prettier-ignore

import sys

# Crawled from https://jsp-ls.berkeley.edu/legal-studies-undergraduate-program/major-requirements/area-distribution-requirements

# Copy and paste, then replace (.*?):.*(\n)? to "$1"
# First (.*?) is non-greedy because course name might have ":"
# You should also remove the cross-listed courses' "C", like C134->134

area_i: list[str] = ["102", "104AC", "105", "109", "123", "125", "129", "150", "160", "163", "164", "165", "170", "185AC", ]
area_ii: list[str] = ["103", "104AC", "105", "107", "107WI", "116", "127", "129", "132AC", "134", "140", "151", "152AC", "153", "155", "156", "159", "160", "161", "164", "168", "172AC", "173AC", "177", "181", "183", ]
area_iii: list[str] = ["105", "107", "107WI", "140", "141", "142", "143", "145", "146", "147", "149", "152AC", "156", "158", "177", "190", ]
area_iv: list[str] = ["101", "106", "106WI", "107", "107WI", "125", "127", "131", "130", "132AC", "133AC", "134", "135", "136", "137", "138", "143", "152AC", "154", "156", "157", "158", "159", "162AC", "164", "165", "174", "175", "180", "182", "183", "184", "187", "189", ]
area_v: list[str] = ["101", "106", "106WI", "111", "119", "123", "127", "130", "131", "133AC", "134", "135", "136", "137", "138", "139", "142", "150", "153", "157", "171", "172AC", "173AC", "174", "176", "177", "178", "179", "182", "187", ]

core_h: list[str] = ["100", "103", "107", "160", "177",]
core_ss: list[str] = ["100", "103", "138", "145", "160", "182", "184"]

req_name_to_list_dict: dict[str, list[str]] = {
    1: area_i,
    2: area_ii,
    3: area_iii,
    4: area_iv,
    5: area_v,
    "H": core_h,
    "SS": core_ss,
}

def data_to_dict(name: dict[str, list[str]]) -> dict[str, set]:
    coursename_to_course_req_dict: dict[str, set[int | str]] = {}

    for req, courses in req_name_to_list_dict.items():
        for course in courses:
            if course not in coursename_to_course_req_dict:
                coursename_to_course_req_dict[course] = set()
            coursename_to_course_req_dict[course].add(req)

    return coursename_to_course_req_dict

def course_and_set_to_js(coursename: str, requirements: set[int | str]) -> str:
    return \
f'''
export const ls{coursename.lower()}: CourseIntf = {{
  name: "LS {coursename}",
  satisfies: new Set([{", ".join(map(lambda x: f'"{str(x)}"' if isinstance(x, str) else str(x), requirements))}]),
}} as const;
'''

def courses_to_js(courses: dict[str, set[int | str]]) -> str:
    return "\n".join(map(lambda course: course_and_set_to_js(course, courses[course]), courses.keys()))    

def to_ts_format(courses: dict[str, set[int | str]]) -> None:
    courses_ordered = dict(sorted(courses.items()))
    PREAMBLE = 'import { CourseIntf } from "../solver/datamodel";'
    print(PREAMBLE)
    print(courses_to_js(courses_ordered))
    inside_map_list = ", ".join(map(lambda x: f"[\"ls{x.lower()}\", ls{x.lower()}]", courses_ordered.keys()))
    print(f'export const allCourses = new Map<string, CourseIntf>([{inside_map_list}]);\n')

if __name__ == "__main__":
    to_ts_format(data_to_dict(req_name_to_list_dict))
