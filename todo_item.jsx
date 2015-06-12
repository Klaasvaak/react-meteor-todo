var cx = React.addons.classSet;

TodoItem = React.createClass({

  getInitialState: function () {
    return {
      edit: false
    };
  },

  // TodoApp is the state owner and should be the one to manipulate the data
  // We pass the event handlers through TodoList to TodoApp
  handleToggle: function () {
    this.props.onToggle(this.props.task._id);
  },

  handleRemove: function () {
    this.props.onRemove(this.props.task._id);
  },

  openEdit: function () {
    this.setState({
      edit: true
    });
  },

  closeEdit: function() {
    this.props.onEdit(this.props.task._id, this.refs.edit.getDOMNode().value);

    this.setState({
      edit: false
    });
  },

  componentDidUpdate: function () {
    if (this.state.edit) {
      this.refs.edit.getDOMNode().focus();
    }
  },

  render: function () {
    var createdAt = this.props.task.createdAt.toString();
    var checkedButtonLabel = this.props.task.done ?
      (<i className="checkmark icon large "></i>) :
      (<i className="checkmark icon large disabled"></i>);

    // Define the css classes using the classSet addon.
    var itemClasses = cx("ui task item", this.props.task.done ? 'done' : '');
    var segmentClasses = cx("ui segment",
      this.props.task.important ? "red" : "");
    var textClasses = cx("ui middle aligned header",
      this.props.task.done ? "disabled" : "");
    var removeClasses = cx("middle aligned ui right floated icon remove \
            large", this.props.task.done ? "disabled" : "");

    var textHTML = '';
    if (!this.state.edit) {
      textHTML = this.props.task.text;
    } else {
      textHTML = <input ref="edit" onBlur={this.closeEdit} defaultValue={this.props.task.text}/>;
    }

    return (
      <div className={itemClasses}>
        <div className={segmentClasses}>
          <div className="ui ribbon label small"
               onClick={this.handleToggle}>
            {checkedButtonLabel}
          </div>
          <span className={textClasses} onClick={this.openEdit}>
              {textHTML}
          </span>
          <i className={removeClasses} onClick={this.handleRemove}></i>
        </div>
      </div>
    )
  }

});
