import React from "react";
import Layout from "../../../components/Layout";
import { graphql } from "gatsby";
import Seo from "../../../components/Seo";
import { getSrc } from "gatsby-plugin-image";
import Banner from "../../../components/Hoteles/Destination/Banner";
import MapaHoteles from "../../../components/Hoteles/partial/Map";
import NavTabs from "../../../components/Hoteles/Destination/NavTabs";
import SideBanner from "../../../components/Banner";
import footerList1 from "../../../constants/Hoteles/global-hotels-links";
import footerList2 from "../../../constants/especialistas-links";
import Breadcrumbs from '../../../components/atoms/Breadcrumbs'
import { vistaToUrlHtml, vistaActionToUrlHtml } from '../../../utilities/stringService'
import Mapa from "../../../components/Home/mapa";

const Locations = ({ data, pageContext }) => {
	
	const locationName = data.location.hvi_desc_spanish;
  const banner = data.location.banner_spanish
  const metadata = data.site.siteMetadata;

  const tree = []
  const treeItem1 = {
    title: locationName,
    slug: vistaToUrlHtml(data.location, 'spanish') ,
  }
  tree.push(treeItem1)

  const items = []
  for (const destino of pageContext.destinos) {
    const item = {
      title: destino.hvi_desc_spanish,
      slug: vistaActionToUrlHtml(destino, 'spanish', 'mapa'),
    }
    items.push(item)
  }

	const listItems1 = {
		title: `${metadata.estado.name}`,
		items: items,
		linkTo: "",
		linkToSuffix: "",
	};
	const seoDescription = `Mapa de hoteles en ${locationName}, ${metadata.estado.name}. Encuentre la ubicación ideal para su hotel en ${locationName}`;

	return (
		<Layout
			linkExterno="/hoteles"
			seoTitle={`Hoteles ${locationName} Mapa`}
			footerList1={footerList1}
			footerList2={footerList2}
		>
			<Seo
				title={`Mapa de Hoteles en ${locationName}`}
				description={seoDescription}
				// image={image ? getSrc(image.localFile.childImageSharp) : ""}
			/>

			<section className="section-center">
				<div className="back-white">
					<Banner
						image={banner}
						vistaDesc={locationName}
						estado={metadata.estado}
						subTitle="Mapa de Hoteles"
						title={`Mapa de Hoteles en ${locationName}`}
					/>
          <Breadcrumbs
            homeLink="/hoteles"
            homeTitle="Hoteles"
            tree={tree}
            endTitle="Mapa"
            singleUrl={true}
          />
					<div className="padding-1">
						<h2>Mapa de Hoteles en {locationName}</h2>
						<p>
							En este mapa te presentamos los hoteles disponibles en{" "}
							<b>{locationName}</b>
						</p>
					</div>
					<NavTabs vista={data.location} />
					<MapaHoteles location={data.location} />
				</div>
				<div>
					<SideBanner
						title={`${locationName} Mapa Hoteles`}
						description={seoDescription}
						// image={image ? image : ""}
						listItems1={listItems1}
					/>
				</div>
			</section>
		</Layout>
	);
};

export default Locations;

export const pageQuery = graphql`
  query($id: String) {
    location(hviid: {eq: $id}) {
      alias
      hvi_desc_english
      hvi_desc_spanish
      banner_english
      banner_spanish
      estado
      hijas {
        hviid
        hvi_desc_spanish
      }
      hviid
      numhoteles
      parentid
      travelpayoutsid
      latitud
      longitud
    }

    site {
      siteMetadata {
        title
        description
        estado {
          name
          slug
          slogan
        }
      }
    }
  }
`;
