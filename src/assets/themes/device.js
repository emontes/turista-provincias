const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}

export default device

// const algo = `
//     @media ${device.mobileL} {
//       font-size: 75%; /* 1 rem = 12px 12/16 = .75 */
//   }
// @media ${device.tablet} {
//     font-size: 87.5%; /* 1 rem = 14px 14/16 = .875 */
//   }
//   @media ${device.laptop} {
//       font-size: 100%; /* 1 rem = 16px 16/16 = 100% */
//   }
//   @media ${device.desktop} {
//       font-size: 112%; /* 1 rem = 18px 18/16 = 1.125% */
//   }
// `;
