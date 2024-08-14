import React from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { FaRegClock } from "react-icons/fa";
import Seo from "../../components/Seo";
import Banner from "../../components/Banner/indexNoticias";
import BannerAdsense from "../../utilities/BannerAdsense";
import Compartir from "../../components/atoms/Compartir";
import TopNavSec from "../../components/atoms/TopNavSec";
import { Link } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";

const Article = ({ data, pageContext }) => {
	const { title, time, hometext, bodytext, cattitle, topictext } =
		data.noticia;
  
	const fecha = new Date(time).toLocaleDateString();

	return (
		<Layout linkExterno="/noticias" seoTitle={title.substring(0, 40)}>
			<Seo
				title={title}
				description={hometext ? hometext.substring(0, 250) : ""}
			/>
			<div className="section">
				{/* <div align="center">
					<BannerAdsense className="h90 mb-1" format="fluid" />
				</div> */}
				<TopNavSec />
				<div className="flex flex-col xl:flex-row gap-4">
					<div className="bg-gray-100 p-4 rounded-lg shadow-md">
						<article>
							<div className="text-center mb-8">
								<h1 className="text-2xl font-bold mb-4">{title}</h1>

								<div className="flex justify-between items-center text-gray-400 mb-4">
									<span className="flex items-center">
										<FaRegClock className="text-primary5 mr-2" />
										{fecha}
									</span>
									<div className="flex gap-2 items-center">
										Compartir:{" "}
										<Compartir url={pageContext.slug} title={title} />
									</div>
								</div>

								<div className="h-1 w-20 bg-gray-900 mx-auto my-4" />
							</div>

							<div dangerouslySetInnerHTML={{ __html: hometext }} />
							{/* <BannerAdsense className="h60 mt-1 mb-1" format="fluid" /> */}
							{bodytext && (
								<div dangerouslySetInnerHTML={{ __html: bodytext }} />
							)}
							<div className="flex justify-between text-sm text-gray-600">
								{cattitle && (
									<Link
										to={`/noticias/${cattitle?.replace(/\s+/g, "-")}.html`}
										className="bg-green-600 text-white px-4 py-2 rounded-full font-bold hover:bg-green-700 transition duration-300"
									>
										{cattitle || "Sin categoría"}
									</Link>
								)}

								{topictext && (
									<Link
										to={`/noticias/tema/${topictext?.replace(/\s+/g, "_")}.html`}
										className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold ml-4 hover:bg-blue-700 transition duration-300"
									>
										{topictext || "Sin tema"}
									</Link>
								)}	
							</div>
						</article>
					</div>
					<Banner
						title={`Noticia en ${topictext || cattitle}`}
						description={topictext ? `Noticia en el tema ${topictext}` : `Noticia en la categoría ${cattitle}`}
						categories={pageContext.categories}
						topics={pageContext.topics}
						image={data.image || ''}
					/>
				</div>
			</div>
		</Layout>
	);
};

const Wrapper = styled.section`
  .icon {
    color: ${(props) => props.theme.colors.primary5};
  }
`;

export const query = graphql`
  query($id: String!, $topicimage: String) {
    noticia: noticia(id: { eq: $id }) {
      sid
      time
      title
      hometext
      bodytext
      catid
      cattitle
      topic
      topicimage
      topictext
    }

    image: file(relativePath: { eq: $topicimage }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;

export default Article;
