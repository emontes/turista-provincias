import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import Seo from "../../components/Seo";
import Breadcrumbs from "../../components/atoms/Breadcrumbs";
import ContainerGrecas from "../../components/molecules/ContainerGrecas";
import BlockGrey from "../../components/atoms/BlockGrey";
import Compartir from "../../components/atoms/Compartir";
import TopNavSec from "../../components/atoms/TopNavSec";

const createSectionObject = (section) => ({
	slug: section.secname
		.replace(/\s+/g, "_")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, ""),
	title: section.secname,
});
const Article = ({ data, pageContext }) => {
	const { title, content } = data.article;

	const items = [];
	pageContext.sectionsMaster.map((section, index) => {
		const item = createSectionObject(section);
		items.push(item);
	});

	const listItems1 = {
		title: "Secciones",
		items: items,
		linkTo: "informacion",
	};

	const tree = [];
	const parentSection = pageContext.sections.find(
		(section) => section.secid === data.section.parentid,
	);
	if (parentSection) {
		tree.push(createSectionObject(parentSection));
	}
	tree.push(createSectionObject(data.section));

	return (
		<Layout linkExterno="/informacion" seoTitle={title}>
			<Seo title={title} description={content.substring(0, 250)} />
      <TopNavSec />
			<ContainerGrecas title={title}>
				<div className=" xl:flex">
					<article>
						<Breadcrumbs
							homeLink="/informacion"
							homeTitle="Información"
							tree={tree}
							endTitle={title}
						/>

						<div
							className="section-article p-4"
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					</article>
					<div>
						<Banner
							title="Informacion"
							description="&nbsp;"
							listItems1={listItems1}
						/>

						<BlockGrey title="compartir">
							<Compartir url={`/info/${pageContext.slug}`} title={title} />
						</BlockGrey>
					</div>
				</div>
				<br />
			</ContainerGrecas>
			
		</Layout>
	);
};

export default Article;

export const pageQuery = graphql`
  query($artid: String!, $secid: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    article: sectionArticle(artid: { eq: $artid }) {
      title
      content
    }
    section: section(secid: { eq: $secid }) {
      secname
      parentid
    }
  }
`;
