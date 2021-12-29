import React from 'react';
import { 
  ListItem, 
  ListItemText, 
  InputBase, 
  Checkbox, 
  ListItemSecondaryAction,
  IconButton } from "@material-ui/core";
import { DeleteOutlined } from '@material-ui/icons';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true };
    this.delete = props.delete;
    this.update = props.update; //update를 this.update에 할당.
  }

  offReadOnlyMode = () => {
    console.log("Event!", this.state.readOnly);
    this.setState({ readOnly: false}, () => {
      console.log("ReadOnly? ", this.state.readOnly)
    });
  }

  deleteEventHandler = () => {
    this.delete(this.state.item);
  }

  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.setState({ readOnly: true});
      this.update(this.state.item);// 엔터를 누르면 저장
    }
  }

  editEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
  }

  checkboxEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.done = !thisItem.done;
    this.setState({ item: thisItem });
    this.update(this.state.item); // 체크박스가 변경되면 저장.
  }

  render() {
    const item = this.state.item;
    return (
      <ListItem>
        <Checkbox 
          checked={item.done}
          onChange={this.checkboxEventHandler}/>
        <ListItemText>
          <InputBase
            inputProps={{ 
              "aria-label": "naked",
              readOnly: this.state.readOnly, 
            }}
            type="text"
            id={item.id} // 각 리스트 구분을 위한 id
            name={item.id} // 각 리스트 구분을 위한 id
            value={item.title}
            multiline={true}
            fullWidth={true}
            onClick={this.offReadOnlyMode}
            onChange={this.editEventHandler}
            onKeyPress={this.enterKeyEventHandler}
          />
        </ListItemText>

        <ListItemSecondaryAction>
          <IconButton 
            aria-label="Delete Todo"
            onClick={this.deleteEventHandler}>
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;