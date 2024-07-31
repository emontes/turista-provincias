import React, { Suspense } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Noticias from "../components/Noticias/noticias-list";
import ContainerGrecas from "../components/molecules/ContainerGrecas";
import Compartir from "../components/atoms/Compartir";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";

import Seo from "../components/Seo";
import BlockGrey from "../components/atoms/BlockGrey";
// import BannerAdsense from '../utilities/BannerAdsense'
const BannerAdsense = React.lazy(() => import("../utilities/BannerAdsense"));

// import ListaDestinos from '../components/Home/location-list'
const ListaDestinos = React.lazy(
	() => import("../components/Home/location-list"),
);
// import Mapa from '../components/Home/Mapa'
const Mapa = React.lazy(() => import("../components/Home/mapa"));

const Index = ({ data, pageContext }) => {
	const metadata = data.site.siteMetadata;

	const { t } = useTranslation();

	let seoDescription = `El turista ${t(
		metadata.estado.name,
	)} cuenta con las herramientas necesarias para que el turista pueda planear su viaje por ${t(
		metadata.estado.name,
	)}; hoteles, noticias, información y mucho más...`;

	if (pageContext.language === "en") {
		seoDescription = `The turista ${t(
			metadata.estado.name,
		)} has all the necesary tools for the tourist can plain his travel to ${t(
			metadata.estado.name,
		)}, hotels, news, information and much more...`;
	}

	return (
		<Layout
			heroImg={data.image.childImageSharp}
			main={t(data.site.siteMetadata.estado.name)}
			sub={t(data.site.siteMetadata.estado.slogan)}
		>
			<Seo title={t("inicio")} description={seoDescription} />

			<ContainerGrecas title={t(metadata.title)} sideNavSec>
				<Suspense fallback={<div>Cargando...</div>}>
					<Mapa
						metadata={data.site.siteMetadata}
						pageContext={pageContext}
						seoDescription={seoDescription}
					/>
					<ListaDestinos metadata={metadata} locations={data.locations.nodes} />
				</Suspense>
			</ContainerGrecas>
		</Layout>
	);
};

export default Index;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
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

    image: file(relativePath: { eq: "portada-1.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }

    locations:allLocation(sort: {fields: hvi_desc_spanish, order: ASC}) {
    nodes {
      hviid
      hvi_desc_spanish
      hvi_desc_english
      numhoteles
    }
  }

  }
`;
