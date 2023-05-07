function Tabs(props) {
    const setActiveTab = props.setActiveTab
    return (
        <div className="Tabs">
            <div className="tab-header">
                <span className="tab-component" onClick={() => setActiveTab('all')}>
                    <a href="#all">all</a>
                </span>
                <span className="tab-component" onClick={() => setActiveTab('active')}>
                    <a href="#active"> active</a>
                </span>
                <span className="tab-component" onClick={() => setActiveTab('completed')}>
                    <a href="#completed"> completed</a>
                </span>
                <hr/>
            </div>
        </div>
    );
}

export default Tabs;