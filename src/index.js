import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

function Header() {
  return (
    <div className="container-fluid text-center bg-secondary-subtle p-5">
      <h1>Louis Xia</h1>
      <h4>
        Elmhurst, New York
        &nbsp;|&nbsp;
        <a class="text-decoration-none text-dark" href="mailto:xialouis1@gmail.com">
          xialouis1@gmail.com
        </a>
        &nbsp;|&nbsp;
        <a class="text-decoration-none text-dark" href="https://www.linkedin.com/in/xialouis1" target="_blank">
          linkedin.com/in/xialouis1
        </a>
        &nbsp;|&nbsp;
        <a class="text-decoration-none text-dark" href="https://github.com/xialouis1" target="_blank">
          github.com/xialouis1
        </a>
      </h4>
      <h4>Software Engineer | Team Lead | Veteran</h4>
    </div>
  );
}

function Projects() {
  const [repos, setRepos] = useState(undefined);
  const [error, setError] = useState(undefined);
  
  async function fetchRepos() {
    //await new Promise(resolve=>setTimeout(resolve, 5000))
    await fetch('https://api.github.com/users/xialouis1/repos')
      .then(async response => 
      {
        if (response.status == 200) {
          const array = await response.json();
          array.sort((a, b) => a.id < b.id)
          setRepos(array);
          return;
        } else {
          setError(true);
        }
      })
      .catch( () => { return undefined });
  }

  fetchRepos();

  if(error) {
    return <ProjectError/>
  } else if (repos === undefined) {
    return <ProjectLoading/>
  } else {
    return <>{repos.map((repo) => <Project title={repo.name} description={repo.description} link={repo.html_url}/>)}</>
  }
}

function Project(props) {
  return (
    <div className="row my-5">
      <div className="col-8 mx-auto bg-light">
          <div className=""><h4><a href={props.link}>{props.title}</a></h4></div>
          <div className="">{props.description}</div>
      </div>
    </div>
  );
}

function ProjectLoading() {
  return (
    <div className="row my-5">
      <div className="col-8 mx-auto text-center">
        <span className="spinner-border align-middle" role="status"></span>
        <span className="align-middle">&nbsp;Loading repositories from GitHub.</span>
      </div>
    </div>
  );
}

function ProjectError() {
  const projects = [
    {
      "name": "Name",
      "description": "Description",
      "html_url": ""
    }, {
      "name": "Name",
      "description": "Description",
      "html_url": ""
    }
  ];

  return <>{projects.map((project) => <Project title={project.name} description={project.description} link={project.html_url}/>)}</>
}

function Portfolio() {
  return (
    <div className="container-fluid">
      <Projects/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Portfolio/>
  </React.StrictMode>
)