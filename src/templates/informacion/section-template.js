import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";
import Banner from "../../components/Banner";
import BannerAdsense from "../../utilities/BannerAdsense";
import Breadcrumbs from "../../components/atoms/Breadcrumbs";
import ContainerGrecas from "../../components/molecules/ContainerGrecas";
import ItemChevron from "../../components/atoms/ItemChevronRight";
import Compartir from "../../components/atoms/Compartir";
import TopNavSec from "../../components/atoms/TopNavSec";
import { Link } from "gatsby";

const Section = ({ data, pageContext }) => {
	const sectionTitle = data.section.secname;
	const metadata = data.site.siteMetadata;

	let sectionParent = "";
	if (data.section.parentid > 0) sectionParent = data.section.parentid;
	let seoDescription = `Artículos Informativos que hablan de ${sectionTitle} en ${metadata.estado.name}, México`;
	if (pageContext.language === "en") {
		seoDescription = `Informative articles that talk about ${sectionTitle} in ${metadata.estado.name}, Mexico`;
	}
	const articles = data.articles.nodes;
	const sections = data.sections.nodes;

	let items = [];
	pageContext.sectionsMaster.map((section, index) => {
		const slug = section.secname
			.replace(/\s+/g, "_")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		let item = {
			slug: slug,
			title: section.secname,
		};
		items.push(item);
	});

	const listItems1 = {
		title: "Secciones",
		items: items,
		linkTo: "informacion",
	};

	let tree = [];
	if (sectionParent > 0) {
		let item = {
			slug: data.parent.secname
				.replace(/\s+/g, "_")
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, ""),
			title: data.parent.secname,
		};
		tree.push(item);
	}

	return (
		<Layout seoTitle={sectionTitle} linkExterno="/informacion">
			<Seo
				title={`${sectionTitle} | información`}
				description={seoDescription}
			/>

			<ContainerGrecas title={`información de ${sectionTitle}`}>
				<div className="section-center">
					<div>
						<Breadcrumbs
							homeLink="/informacion"
							homeTitle="Información"
							tree={tree}
							endTitle={sectionTitle}
						/>

						<h3 className="text-red-500 uppercase">{sectionTitle}</h3>
						<BannerAdsense className="h90 mt1 mb1" format="fluid" />
						{sections.length > 0 && (
							<div className=" mb-3">
								<h4>Secciones</h4>

								<ul>
									{sections.map((item) => {
										const slug = item.secname
											.replace(/\s+/g, "_")
											.normalize("NFD")
											.replace(/[\u0300-\u036f]/g, "");
										return (
											<li key={item.secid}>
												<Link to={`/informacion/${slug}`}>
													<ItemChevron text={item.secname} />
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						)}
						{articles.length > 0 && (
							<div className="mb-6">
								<h4>Artículos</h4>
								<ul className="sm:columns-2 xl:columns-3">
									{articles.map((item) => {
										const slug = item.title
											.replace(/\s+/g, "_")
											.normalize("NFD")
											.replace(/[\u0300-\u036f]/g, "");
										return (
											<li key={item.artid}>
												<Link to={`/info/${slug}`} className="border-b">
													<ItemChevron text={item.title} />
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						)}
						<div className=" text-slate-400 w-1/4">
							Compartir:
							<Compartir
								url={`/info/${pageContext.slug}`}
								title={sectionTitle}
							/>
						</div>
					</div>
					<div style={{ padding: "0 1rem 1rem" }}>
						<Banner
							title="Información"
							description={seoDescription}
							listItems1={listItems1}
						/>
					</div>
				</div>
			</ContainerGrecas>
			<TopNavSec />
		</Layout>
	);
};

export default Section;

export const query = graphql`
  query($secid: String!, $parentid: String) {
    section: section(secid: { eq: $secid }) {
      secname
      parentid
    }
    parent: section(secid: {eq: $parentid}) {
      parentid
      secname
    }
    sections: allSection(
      filter: { parentid:  { eq: $secid }  }
    ) {
      nodes {
        secid
        secname
      }
    }
    
    articles:  allSectionArticle(
      filter: {secid: {eq: $secid}}
      ) {
      nodes {
        artid
        title
      }
    }

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
  }
`;
