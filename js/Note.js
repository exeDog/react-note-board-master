class Note extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editing : false
        }
        this.randomBetween = this.randomBetween.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }
    componentWillMount(){
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
    }
    componentDidMount(){
        var node = ReactDOM.findDOMNode(this);
        $(node).draggable();
    }

    randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }
    edit(){
        this.setState({editing: true});
    }
    save() {
        var refValue = ReactDOM.findDOMNode(this.refs.newText).value;
        this.props.onChange(refValue, this.props.index);
        this.setState({editing: false});
    }
    remove() {
        this.props.onRemove(this.props.index);
    }
    renderDisplay() {
        return (
            <div className="note"
                 style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
        );
    }
    renderForm() {
        return (
            <div className="note" style={this.style}>
            <textarea ref="newText" defaultValue={this.props.children}
                      className="form-control"></textarea>
                <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
        )
    }
    render() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }

}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notes : []
        }
        this.nextId = this.nextId.bind(this);
        this.add = this.add.bind(this);
        this.update =  this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.eachNote = this.eachNote.bind(this);

    }
    componentDidMount(){
        fetch('../js/routes/getNoteItems',{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json())
            .then(function (response) {
                this.setState({notes : response.notes});
            }.bind(this));

    }
    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }
    add(text) {
        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({notes: arr});
    }
    update(newText, i) {
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({notes:arr});
    }
    remove(i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({notes: arr});
    }
    eachNote(note, i) {
        return (
            <Note key={note.id}
                  index={i}
                  onChange={this.update}
                  onRemove={this.remove}
            >{note.note}</Note>
        );
    }
    render() {
        return (<div className="board">
                {this.state.notes.map(this.eachNote)}
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                        onClick={this.add.bind(null, "New Note")}/>
            </div>

        );
    }

}


ReactDOM.render(<Board />,
    document.getElementById('react-container'));










