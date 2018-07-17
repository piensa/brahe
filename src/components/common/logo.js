// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import styled from 'styled-components';
import {KEPLER_GL_NAME, KEPLER_GL_VERSION} from 'constants/default-settings';

const defaultProps = {
  appName: KEPLER_GL_NAME,
  version: KEPLER_GL_VERSION
};

const LogoTitle = styled.div`
  display: inline-block;
  margin-left: 6px;
`;

const LogoName = styled.div`
  color: ${props => props.theme.activeColor};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.17px;
`;
const LogoVersion = styled.div`
  font-size: 10px;
  color: ${props => props.theme.subtextColor};
  letter-spacing: 0.83px;
  line-height: 14px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const LogoSvgWrapper = styled.div`
  margin-top: 3px;
`;

const LogoSvg = () => (
  <svg
    className="side-panel-logo__logo"
    width="22px"
    height="15px"
    viewBox="0 0 22 15"
  >
    <g transform="translate(11, -3) rotate(45.000000)">
      <rect fill="#535C6C" x="0" y="5" width="10" height="10" />
      <rect fill="#1FBAD6" x="5" y="0" width="10" height="10" />
    </g>
  </svg>
);

const LogoPng = () => (
    <img alt="Smiley face" width="90px" src='data:image/png;base64,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'/>
);

const KeplerGlLogo = ({appName, version}) => (
  <LogoWrapper className="side-panel-logo">
    <LogoSvgWrapper>
      <LogoSvg />
    </LogoSvgWrapper>
    <LogoTitle className="logo__title">
      <LogoName className="logo__name">{appName}</LogoName>
      {version ? <LogoVersion className="logo__version">{version}</LogoVersion> : null}
    </LogoTitle>
  </LogoWrapper>
);

KeplerGlLogo.defaultProps = defaultProps;

export default KeplerGlLogo;
