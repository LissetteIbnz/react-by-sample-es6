import React from 'react';
import PropTypes from 'prop-types';

const onChangeName = (props) => (e) => {
  props.onEditingNameUpdated(e.target.value)
}

export const NameEditComponent = (props) => {

      return (
        <div>
          <label>Update Name:</label>
          <input 
            value={props.editingUserName}
            onChange={onChangeName(props)} 
          />
          <input 
            type="submit"
            value="Change" 
            className="btn btn-default" 
            onClick={props.onNameUpdateRequest} 
          />
        </div>
      );
  }

NameEditComponent.propTypes = {
  editingUserName: PropTypes.string.isRequired,
  onEditingNameUpdated: PropTypes.func.isRequired,
  onNameUpdateRequest: PropTypes.func.isRequired
};
