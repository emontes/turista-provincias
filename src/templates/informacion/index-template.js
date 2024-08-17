import React from "react";
import Layout from "../../components/Layout";
import { graphql } from "gatsby";
import Seo from "../../components/Seo";
import BannerAdsense from "../../utilities/BannerAdsense";
import { getSrc } from "gatsby-plugin-image";
import ContainerGrecas from "../../components/molecules/ContainerGrecas";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import { Link } from "gatsby";

const Informacion = ({ data, pageContext }) => {
	const metadata = data.site.siteMetadata;
	const { t } = useTranslation();
	let seoTitle = `Información sobre ${t(metadata.estado.name)}`;
	let seoDescription = `Artículos informativos sobre el estado de ${t(
		metadata.estado.name,
	)}, México`;
	if (pageContext.language === "en") {
		seoTitle = `Information about ${t(metadata.estado.name)}`;
		seoDescription = `Informative articles regarding the state of ${t(
			metadata.estado.name,
		)}, Mexico`;
	}

	return (
		<Layout
      		heroImg={data.image ? data.image.childImageSharp : ''}
			main={t("información")}
			sub={`${t("Acerca de")} ${t(metadata.estado.name)}`}
			seoTitle={`${metadata.estado.name} Información`}
			linkExterno="/informacion"
		>
			<Seo
				title={seoTitle}
				description={seoDescription}
        		image={data.image ? getSrc(data.image.childImageSharp) : ''}
			/>
			<ContainerGrecas title={seoTitle} sideNavSec>
				<h3 className="uppercase text-red-500">
					<Trans>Secciones</Trans>
				</h3>
				<BannerAdsense className="h90 mt1 mb1" format="fluid" />
				<div
					className="cont-area"
					style={{
						padding: "2rem",
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						alignItems: "center",
						gap: "2rem",
					}}
				>
					{pageContext.sections.map((item) => (
						<div
							key={item.secid}
							className="m-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
							style={{ width: "200px", height: "170px" }}
						>
							<div
								className="p-3 text-center font-bold text-white"
								style={{ backgroundColor: item.color }}
							>
								{t(item.secname)}
							</div>
							<div className="bg-white h-full p-4 flex flex-col justify-between">
								<p className="text-sm text-gray-700">{item.metadescrip}</p>
								<Link
									to={`/informacion/${item.secname.replace(/\s+/g, "_")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")}`}
									className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 text-center"
								>
									Visitar
								</Link>
							</div>
						</div>
					))}
				</div>
			</ContainerGrecas>
		</Layout>
	);
};


export default Informacion;

export const query = graphql`
  query {
  #   locales: allLocale(filter: { language: { eq: $language } }) {
  #     edges {
  #       node {
  #         ns
  #         data
  #         language
  #       }
  #     }
  #   }
    site {
      siteMetadata {
        description
        estado {
          name
          slug
          slogan
        }
      }
    }

    image: file(relativePath: { eq: "topic-informacion.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;
