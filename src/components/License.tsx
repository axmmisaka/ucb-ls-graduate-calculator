import { Link, Typography } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"

export const Contribute = (): JSX.Element => (
    <>
        <Link href="https://github.com/axmmisaka/ucb-ls-graduate-calculator">
            <Typography variant="h3">to contribute: fork me on github!</Typography>
            <GitHubIcon />
        </Link>
    </>
)

export const License = (): JSX.Element => (
    // https://stackoverflow.com/a/53494821
    <Typography align="left" component={"span"} sx={{ fontWeight: "light", fontSize: "smaller" }}>
        <div>
            <p>Copyright 2024 - Kagamihara Nadeshiko &lt;axmmisaka@users.noreply.github.com&gt;</p>
            <p>Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:</p>
            <ol>
                <li>
                    <p>Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.</p>
                </li>
                <li>
                    <p>Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.</p>
                </li>
                <li>
                    <p>Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.</p>
                </li>
            </ol>
            <p>THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.</p>
            <hr />
            <p>
                Copyright © 2024 Kagamihara Nadeshiko &lt;axmmisaka@users.noreply.github.com&gt;
                <br />
                This work is free. It comes without any warranty, to the fullest extent permitted by applicable law. You can redistribute it and/or modify it under the terms of the Do What The Fuck You Want To Public License, Version 2, as published by Sam Hocevar.
            </p>
            <p>You further acknowledge that “license” is an incorrect spell of the noun “licence”, because “there is British English, and there are mistakes”.</p>
            <p>
                DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                <br />
                Version 2, December 2004
            </p>
            <p>Copyright © 2004 Sam Hocevar</p>
            <p>Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.</p>
            <p>
                DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                <br />
                TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
            </p>
            <ol>
                <li>You just DO WHAT THE FUCK YOU WANT TO.</li>
            </ol>
        </div>
    </Typography>
)

export const Disclaimer = (): JSX.Element => (
    <>
        <Typography align="justify" paragraph>
            Disclaimer: The content provided on this website and within any program made available for execution locally is provided for informational purposes only and should not be construed as an authoritative or exhaustive representation of the requirements fulfilled by any class listed herein. You are expressly advised that the results generated by the use of the website are not intended to serve as an adequate substitute for the CalCentral APR, if available, or direct consultation with Lauri or other LS-JSP advisor.
        </Typography>
        <Typography align="justify" paragraph>
            By using this site you acknowledge and agree to assume all risks associated with such use. The maintainer(s) make(s) no warranties or representations as to the accuracy, completeness, reliability, suitability, or availability of the information provided and expressly disclaims liability for any errors or omissions in this information, as stressed below in the licences.
        </Typography>
        <Typography align="justify" paragraph>
            By using this website you understand that reliance on the content provided herein is strictly at your own risk.
        </Typography>
        <Typography align="justify" paragraph>
            TLDR: if this website says you can graduate now (or after taking, say LS whatever), and it turns out you can't, don't blame it on me or Lauri, you screwed it up!
        </Typography>
    </>
)
