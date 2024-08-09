// src/templates/noticias/noticia-template.js

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

const Article = ({ pageContext }) => {
	const { noticiaCompleta } = pageContext;
	const { title, time, hometext, bodytext, cattitle, topictext, topicimage } =
		noticiaCompleta;

  // console.log ('Categories: ', pageContext.categories)
  // console.log  ('Topics: ', pageContext.topics)
  
	const fecha = new Date(time).toLocaleDateString();

	// let displayImage
	// if (image) {
	//   displayImage = image
	// } else {
	//   if (topics[0]) displayImage = topics[0].image
	// }

	return (
		<Layout linkExterno="/noticias" seoTitle={title.substring(0, 40)}>
			<Seo
				title={title}
				description={hometext ? hometext.substring(0, 250) : ""}
				// image={
				//   displayImage ? getSrc(displayImage.localFile.childImageSharp) : ''
				// }
			/>
			<Wrapper className="section">
				<div align="center">
					<BannerAdsense className="h90 mb1" format="fluid" />
				</div>
				<TopNavSec />
				<div className="flex flex-col xl:flex-row gap-4">
					<div
						className="cont-area"
						style={{ background: "var(--clr-grey-10)" }}
					>
						<article className="article">
							<div className="post-info">
								<h1>{title}</h1>

								<div className="date-box text-slate-400">
									<span className="date">
										<FaRegClock className="icon" />
										{fecha}
									</span>
									<div className="flex gap-2 items-center">
										Compartir:{" "}
										<Compartir url={pageContext.slug} title={title} />
									</div>
								</div>

								<div className="underline" />
							</div>

							<div
								dangerouslySetInnerHTML={{ __html: noticiaCompleta.hometext }}
							/>
							<BannerAdsense className="h60 mt1 mb1" format="fluid" />
							{bodytext && (
								<div
									dangerouslySetInnerHTML={{ __html: noticiaCompleta.bodytext }}
								/>
							)}
							<Metadata>
								{cattitle && (
									<Category
										to={`/noticias/${cattitle?.replace(/\s+/g, "-")}.html`}
									>
										{cattitle || "Sin categoría"}
									</Category>
								)}

                {topictext && (
                  <Topic
									to={`/noticias/tema/${topictext?.replace(/\s+/g, "-")}.html`}
								>
									{topictext || "Sin tema"}
								</Topic>
                  
                )}	
							</Metadata>
						</article>

						
					</div>
          <Banner
							title="Noticia"
							categories={pageContext.categories}
              topics={pageContext.topics}
              image={topicimage}
						/>
				</div>
			</Wrapper>
		</Layout>
	);
};

const Wrapper = styled.section`
  .article {
    padding: 0 1rem;
    margin: 0 0 2rem;
  }
  .category {
    color: var(--clr-white);
    background: var(--clr-grey-4);
    border-radius: var(--radius);
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing);
  }
  .topic {
    background: var(--clr-grey-8);
    margin-right: 1rem;
  }
  .post-info {
    margin: 2rem 0 4rem 0;
    text-align: center;

    h1 {
      margin: 1.25rem 0;
      font-size: 1.9rem;
      font-weight: 400;
    }

    .date-box {
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & .date {
        display: flex;
        align-items: center;
        & .icon {
          color: ${(props) => props.theme.colors.primary5};
          margin-right: 0.5rem;
        }
      }
    }
  }

  .image {
    width: 100%;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }

  .underline {
    width: 5rem;
    height: 1px;
    background: var(--clr-grey-9);
    margin: 1rem auto;
    margin-bottom: 1rem;
  }
`;

const Metadata = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const Category = styled(Link)`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Topic = styled(Link)`
  background-color: #2196f3;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  margin-left: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1e88e5;
  }
`;
export default Article;
