const Repo = (props) => {
    const {repo} = props;
    return (
        <li className="list-group-item d-flex justify-content-between aling-items-center" key={repo.id.toString()}>
            <div className="d-flex flex-column">
                <a className="h5 mt-0 text-decoration-none" href={repo.url}>{repo.name}</a>
                <p className="small">{new Date(repo.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="d-flex flex-column">
            <button className={
                "btn btn-sm " + 
                (repo.viewerSubscription === 'SUBSCRIBED' ? "btn-success" : 'btn-outline-secondary')
                }>{repo.viewerSubscription}</button>
            </div>
        </li>
    )
};

export default Repo;