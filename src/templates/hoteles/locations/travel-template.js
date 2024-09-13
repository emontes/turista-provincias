import React from "react";
import Layout from "../../../components/Layout";
import { graphql } from "gatsby";
import Seo from "../../../components/Seo";
import { getSrc } from "gatsby-plugin-image";
import Banner from "../../../components/Hoteles/Destination/Banner";
import NavTabs from "../../../components/Hoteles/Destination/NavTabs";
import footerList1 from "../../../constants/Hoteles/global-hotels-links";
import footerList2 from "../../../constants/especialistas-links";
import SideBanner from "../../../components/Banner";
import Breadcrumbs from "../../../components/atoms/Breadcrumbs";
import {
	vistaToUrlHtml,
	vistaActionToUrlHtml,
} from "../../../utilities/stringService";

const Locations = ({ data, pageContext }) => {
	const hotelsUrl = `https://jet.turista.com.mx/hotels?cityId=${data.location.travelpayoutsid}&currency=mxn`;
	const { image, numhoteles } = data.location;
	const locationName = data.location.hvi_desc_spanish;
	const banner = data.location.banner_spanish;
	const metadata = data.site.siteMetadata;

	const tree = [];
	const treeItem1 = {
		title: locationName,
		slug: vistaToUrlHtml(data.location, "spanish"),
	};
	tree.push(treeItem1);

	const items = [];
	for (const destino of pageContext.destinos) {
		const item = {
			title: destino.hvi_desc_spanish,
			slug: vistaActionToUrlHtml(destino, "spanish", "travel"),
		};
		items.push(item);
	}

	const listItems1 = {
		title: `${metadata.estado.name}`,
		items: items,
		linkTo: "",
		linkToSuffix: "",
	};

	return (
		<Layout
			linkExterno="/hoteles"
			seoTitle={`Hoteles en ${locationName}`}
			footerList1={footerList1}
			footerList2={footerList2}
		>
			<Seo
				title={`Viaja a ${locationName}`}
				description={`Hospedaje en ${locationName}, ${metadata.estado.name}. Reservaciones en línea e información de tarifas y disponibilidad para encontrar su hospedaje en ${locationName}`}
				image={image ? getSrc(image.localFile.childImageSharp) : ""}
			/>
			<section className="section-center">
				<div className="back-white">
        <Banner
            image={banner}
            vistaDesc={locationName}
            estado={metadata.estado}
            subTitle={`${numhoteles} hoteles en `}
            title={`${locationName} Hoteles`}
          />
					<Breadcrumbs
						homeLink="/hoteles"
						homeTitle="Hoteles"
						tree={tree}
						endTitle="Travel"
						singleUrl={true}
					/>
					<NavTabs vista={data.location} />

					<iframe
						title="jetTurista"
						src={hotelsUrl}
						style={{ width: "100%", height: "210rem" }}
					/>
				</div>
				<div>
					<SideBanner
						title={locationName}
						description={`Hospedaje en ${locationName}`}
						image={image ? image : ""}
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
