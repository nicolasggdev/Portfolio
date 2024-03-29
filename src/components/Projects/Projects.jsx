import "./Projects.styles.css";
import Modal from "../Modal/Modal";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setProject } from "../../store/slices/projectSlice";

const Projects = () => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const [t] = useTranslation("global");

  const { list: projects } = useSelector((state) => state.projectSlice);

  const { theme } = useSelector((state) => state.generalSlice);

  const dispatch = useDispatch();

  const updateItemsPerPage = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 576) {
      setItemsPerPage(4);
    } else {
      setItemsPerPage(2);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateItemsPerPage);

    updateItemsPerPage();

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(projects.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(projects.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, projects]);

  // const filterProjects = (e) => {
  //   e.preventDefault();
  // };

  const getProject = (project) => {
    dispatch(setProject(project));
  };

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % projects.length;
    setItemOffset(newOffset);
  };

  // const roleOptions = [
  //   {
  //     option: t("projects.roles.option1"),
  //     value: "all"
  //   },
  //   {
  //     option: t("projects.roles.option2"),
  //     value: "full"
  //   },
  //   {
  //     option: t("projects.roles.option3"),
  //     value: "front"
  //   },
  //   {
  //     option: t("projects.roles.option4"),
  //     value: "back"
  //   }
  // ];

  // const technologiesOptions = [
  //   {
  //     option: t("projects.technologies.option1"),
  //     value: "all"
  //   },
  //   {
  //     option: t("projects.technologies.option2"),
  //     value: "react"
  //   },
  //   {
  //     option: t("projects.technologies.option3"),
  //     value: "vue"
  //   },
  //   {
  //     option: t("projects.technologies.option4"),
  //     value: "express"
  //   },
  //   {
  //     option: t("projects.technologies.option5"),
  //     value: "laravel"
  //   }
  // ];

  return (
    <>
      <section
        className={`container__projects p-4 ${theme}__projects`}
        id="Projects"
      >
        <h3 className={`text-center ${theme}-text__projects`}>
          {t("projects.title")}
        </h3>
        {/* <form onSubmit={(e) => filterProjects(e)} className="mt-4 mb-4">
          <select
            className="form-select mb-3"
            aria-label="Default select example"
          >
            {roleOptions.map((element, index) => {
              return (
                <option value={element.value} key={index}>
                  {element.option}
                </option>
              );
            })}
          </select>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
          >
            {technologiesOptions.map((element, index) => {
              return (
                <option value={element.value} key={index}>
                  {element.option}
                </option>
              );
            })}
          </select>
        </form> */}
        <div className="project-container__projects d-flex flex-wrap justify-content-center mb-4 mt-4">
          {currentItems?.map((project) => {
            return (
              <div className="item__projects" key={project.id}>
                <div
                  className="project-image__projects"
                  style={{
                    backgroundImage: `url(${project.image})`
                  }}
                  data-bs-target="#projectModal"
                  data-bs-toggle="modal"
                  onClick={() => getProject(project)}
                >
                  <div className="cover__projects">
                    <p>INFO</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {pageCount !== 1 && (
          <nav
            className={`pagination rounded-pill mt-5 d-flex align-items-center ${theme}-pagination__projects`}
          >
            <ReactPaginate
              containerClassName="list"
              breakClassName="points"
              pageClassName="other-pages"
              previousLinkClassName="previous-botton"
              nextLinkClassName="next-botton"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </nav>
        )}
      </section>
      <Modal />
    </>
  );
};

export default Projects;
