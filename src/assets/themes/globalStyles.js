import { createGlobalStyle } from 'styled-components'
import device from './device'

const GlobalStyle = createGlobalStyle`
/*
=============== 
Fonts
===============
*/

/* Esto causa un error en producción */

 ${
   '' /* @import url("http://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic");  */
 }



/*
=============== 
Variables
===============
*/
:root {
 /* darkest grey - used for headings */
  --clr-grey-1: hsl(201, 35%, 9%);
  --clr-grey-3: hsl(203, 35%, 10%);
  --clr-grey-4: hsl(209, 28%, 39%);
  /* grey used for paragraphs */
  --clr-grey-5: hsl(210, 22%, 49%);
  --clr-grey-8: hsl(210, 31%, 80%);
  --clr-grey-9: #d7dadb;
  --clr-grey-10: hsl(210, 36%, 96%);
  --clr-green-dark: hsl(125, 67%, 35%);
  --clr-red-dark: hsl(356, 80%, 46%);
  --clr-red-light: hsl(360, 71%, 66%);
  --clr-black: #222;
  --clr-white: #fff;
  --clr-white-transparency-8: rgba(255, 255, 255, 0.8);
  --ff-primary:  "Helvetica Neue", Helvetica, Arial, sans-serif;
  
  --ff-secondary: "Open Sans", sans-serif;
  --transition: all 0.3s linear;
  --spacing: 0.2rem;
  --radius: 0.25rem;
  --light-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  --dark-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  --max-width: 117rem;
  --fixed-width: 70rem;
}
/*
=============== 
Global Styles
===============
*/

*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
    /* This defines what 1rem is */
  font-size: 62.5%; /* 1 rem = 10px; 10px/16px = 62.5% */

  @media ${device.mobileL} {
      font-size: 75%; /* 1 rem = 12px 12/16 = .75 */
  }
  @media ${device.tablet} {
    font-size: 81.25%; /* 1 rem = 13px 13/16 = .8125 */
  }
  @media ${device.laptop} {
      font-size: 87.5%; /* 1 rem = 14px 14/16 = .875% */
  }
  @media ${device.desktop} {
      font-size: 93.75%; /* 1 rem = 15px 15/16 = .9375% */
  }
  @media ${device.desktopL} {
      font-size: 100%; /* 1 rem = 16px 16/16 = 1% */
  }

  
}
body {
  font-family: var(--ff-primary);
  
  color: var(--clr-grey-1);
  line-height: 1.5;
  font-size: 1.2rem;
  margin-top: 5.8rem;
}
ul {
  list-style-type: none;
  
}
a {
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary5};
  :hover {
    color: ${(props) => props.theme.colors.primary9};
  }
}
p {
  margin-bottom: 1.4rem;
  color: ${(props) => props.theme.colors.primary8};
  font-size: 1.3rem;
}
h1,
h2,
h3,
h4 {
  letter-spacing: var(--spacing);

  line-height: 1.25;
  margin-bottom: 0.75rem; /* .75 x 16 = 12 */
  font-family: var(--ff-primary);
}
h1 {
  font-size: 3rem; /* 3x16 = 48 */
}
h2 {
  font-size: 2rem; /* 2x16 = 32 */
}
h3 {
  font-size: 1.25rem; /* 1.25*16 = 20 */
}
h4 {
  font-size: 0.875rem; /* .875*16 = 14 */
}

@media screen and (min-width: 800px) {
  h1 {
    font-size: 4rem; /* 4*16 = 64 */
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 1.75rem; /* 1.75*16 = 28 */
  }
  h4 {
    font-size: 1rem;
  }
  body {
    font-size: 1rem;
  }
  h1,
  h2,
  h3,
  h4 {
    line-height: 1;
  }
}

/* section */
.section {
  
  ${'' /* max-width: var(--max-width); */}
  margin: 0 auto;
  margin-bottom: 4rem;
  background: var(--clr-white);
  padding: 1rem;
}

.section-center {
  @media screen and (min-width: 1170px) {
    display: grid;
    grid-template-columns: 1fr 30rem;
    column-gap: 1rem;
  }
}

.padding-1 {padding: 1rem}
.green-text {color: var(--clr-green-dark);}

.back-white { background-color: var(--clr-white); }
.back-grey-8 { background-color: var(--clr-grey-8); }
.back-grey-9 { background-color: var(--clr-grey-9); }
.back-grey-10 { background-color: var(--clr-grey-10); }

.back-primary-8 { background-color: ${(props) => props.theme.colors.primary8} }
.back-primary-9 { background-color: ${(props) => props.theme.colors.primary9} }
.back-primary-10 { background-color: ${(props) =>
  props.theme.colors.primary10} }

.section-title {
  
    text-transform: uppercase;
    color: var(--clr-red-dark);
    
    margin: 0;
}

.cont-area {
    background: var(--clr-grey-10);
    border: 1px solid #d3d3d3;
    border-radius: 8px;
    box-shadow: 0px 0px 1px #d3d3d3;
    position: relative;
    padding: 1rem;
}

table {
    width: 100%;
    display: table;
    border-collapse: collapse;
    border-spacing: 0;
    background: var(--clr-grey-9);
tr:nth-child(odd) {background-color: var(--clr-grey-10);}
td,th {padding: 15px 5px;
    display: table-cell;
    text-align: left;
    vertical-align: middle;
    border-radius: 2px;}
    font-size: 1.2rem;
th {
  background: ${(props) => props.theme.colors.primary2};
  color: var(--clr-white);
  
  font-size: 1.4rem;
  }
a {color: #039be5; :hover{color: var(--clr-red-light);}}
}


  

.category-menu {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.primary1};
    line-height: 2rem;
    display: block;
    
    letter-spacing: var(--spacing);
    transition: var(--transition);
    border-radius: var(--radius);
  }
  .category-menu:hover {
    background: ${(props) => props.theme.colors.primary7};
  }

/* social links */

.footer-icons {
  font-size: 2.4rem;
  display: flex;
  justify-content: space-between;
}

.nav-icons {
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
  }

.social-icon {
    
    transition: var(--transition);
    margin-left: 0.5rem;
  }

/*===============
Banner Component
===============
*/
.banner-icons {
  display: flex;
  justify-content: center;
}
.banner-icons a {
  font-size: 1.5rem;
  margin: 0 0.25rem;
}
.banner-icons li {
  transition: var(--transition);
}
.banner-icons li:hover {
  transform: translateY(-10%);
}


.social-icon:hover {
    color: ${(props) => props.theme.colors.primary10};
    transform: translateY(-5px);
  }
.facebook-icon {
  color: #3b5998;
}
.twitter-icon {
  color: #00acee;
}
.dribble-icon {
  color: #ea4c89;
}
/*
=============== 
Sidebar
===============
*/
.sidebar {
  background: var(--clr-grey-10);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: grid;
  place-items: center;
  opacity: 0;
  transition: var(--transition);
  transform: translateX(-100%);
}
.show-sidebar {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-links li a {
  display: block;
  text-align: center;
  text-transform: capitalize;
  color: ${(props) => props.theme.colors.primary7};
  letter-spacing: var(--spacing);
  margin-bottom: 0.5rem;
  font-size: 2rem;
  transition: var(--transition);
  border-radius: var(--radius);
}
.sidebar-links li a:hover {
  background: ${(props) => props.theme.colors.primary9};
  color: ${(props) => props.theme.colors.primary10};
}
.close-btn {
  position: absolute;
  right: 4.75%;
  top: 2.75%;
  font-size: 4rem;
  background: transparent;
  border-color: transparent;
  color: var(--clr-red-dark);
  cursor: pointer;
}
@media screen and (min-width: 992px) {
  .sidebar {
    transform: translateX(-100%);
  }
}
`

export default GlobalStyle
