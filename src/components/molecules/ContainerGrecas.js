import React from 'react'
import styled from 'styled-components'
import SideNavSec from '../atoms/SideNavSec'
import device from '../../assets/themes/device'

const ContainerGrecas = ({ title, children, sideNavSec }) => {
  return (
    <Wrapper>
      <h2 className="nav_main--h2">{title}</h2>
      <div className="economy_bg">
        {sideNavSec && <SideNavSec />}

        <div className="nav_link_details">{children}</div>
      </div>
    </Wrapper>
  )
}

export default ContainerGrecas

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.primary1};
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-radius: 5px;
  position: relative;

  .nav_main--h2 {
    background: url(${(props) => props.theme.images.headingBg}) repeat-x left
      top;
    margin: 0px 0 0.65rem 0;
    font-size: 2.2rem;
    font-weight: normal;
    line-height: 62px;
    color: var(--clr-white);
    padding: 0 0 0 18px;
    text-transform: uppercase;
    border-radius: 5px 5px 0px 0px;
    position: relative;
  }

  .economy_bg {
    background: ${(props) => props.theme.colors.primary10};
    margin: 0 10px 0 10px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    @media ${device.lg} {
      flex-direction: row;
    }
  }
  .nav_link_details {
    background: var(--clr-white);
    padding: 1rem;
    width: 100%;
  }
`
