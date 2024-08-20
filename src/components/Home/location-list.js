import React from "react";
import Title from "../atoms/Title";
import ItemChevron from "../../components/atoms/ItemChevronRight";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";
import { vistaToUrlHtml } from "../../utilities/stringService";

const Lista = ({ metadata, locations }) => {
	const { t } = useTranslation();
	return (
		<section>
			<Title
				title={t("Principales Destinos")}
				subtitle={` ${t("en")} ${t(metadata.estado.name)}`}
				className="mt-12"
			/>
			<ul className="columns-2 sm:columns-3 xl:columns-4">
				{locations.map((item, i) => {
					if (item.hviid > 0) {
						return (
							<li key={i}>
								<Link
									to={vistaToUrlHtml(item, "spanish")}
									title={`Hoteles en ${item.hvi_desc_spanish}`}
								>
									<ItemChevron text={item.hvi_desc_spanish} />
								</Link>
							</li>
						);
					}
				})}
			</ul>
		</section>
	);
};

export default Lista;
