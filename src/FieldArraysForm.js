import React from "react";
import { connect } from "react-redux";
import { Field, FieldArray, formValueSelector, reduxForm } from "redux-form";
import validate from "./validate";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      {...input}
      type={type}
      placeholder={label}
      className="form-control"
    />
    {touched && error && <span>{error}</span>}
  </div>
);

const renderHobbies = ({ fields, meta: { error } }) => (
  <div>
    <div className="form-row d-flex justify-content-center">
      <button
        type="button"
        onClick={() => fields.push({})}
        className="btn btn-primary btn-sm"
      >
        Add Hobby
      </button>
    </div>
    {fields.map((hobby, index) => (
      <div className="form-row  d-flex justify-content-between" key={index}>
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
        <button
          type="button"
          title="Remove Hobby"
          className="btn btn-danger btn-sm"
          onClick={() => fields.remove(index)}
        >
          Delete
        </button>
      </div>
    ))}
    {error && <li className="error">{error}</li>}
  </div>
);

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div>
    <div className="form-row d-flex justify-content-center">
      <button
        type="button"
        onClick={() => fields.push({})}
        className="btn btn-light btn-sm"
      >
        Add Member
      </button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </div>
    {fields.map((member, index) => (
      <div key={index}>
        <div className="form-row d-flex justify-content-between">
          <h4>Member #{index + 1}</h4>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            title="Remove Member"
            onClick={() => fields.remove(index)}
          >
            Delete
          </button>
        </div>
        <div className="form-row">
          <Field
            name={`${member}.name`}
            type="text"
            component={renderField}
            label="First Name"
          />
          <Field
            name={`${member}.lastName`}
            type="text"
            component={renderField}
            label="Last Name"
          />
        </div>
        <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
      </div>
    ))}
  </div>
);

const mapStateToProps = state => ({
  members: formValueSelector("fieldArrays")(state, "members")
});

class FieldArraysForm extends React.Component {
  render() {
    var { handleSubmit, pristine, reset, submitting, members } = this.props;

    var renderIngredients = () => {
      if (!members) {
        return (
          <div className="card-body">Add Ingredients to the list first</div>
        );
      } else {
        return (
          <div className="accordion" id="classification">
            {members.map((classification, classificationIndex) => {
              var { name = "Untitiled" } = classification;
              return (
                <div className="card">
                  <button
                    className="btn btn-link m-0 p-0"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#${name}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <div className="card-header" id={`heading_${name}`}>
                      <h5 className="mb-0">{name}</h5>
                    </div>
                  </button>

                  <div
                    id={name}
                    className="collapse"
                    aria-labelledby={`heading_${name}`}
                    data-parent="#classification"
                  >
                    <div class="list-group list-group-flush">
                      <button
                        type="button"
                        class="list-group-item list-group-item-action active"
                      >
                        Cras justo odio
                      </button>
                      <button
                        type="button"
                        class="list-group-item list-group-item-action"
                      >
                        Dapibus ac facilisis in
                      </button>
                      <button
                        type="button"
                        class="list-group-item list-group-item-action"
                      >
                        Morbi leo risus
                      </button>
                      <button
                        type="button"
                        class="list-group-item list-group-item-action"
                      >
                        Porta ac consectetur ac
                      </button>
                      <button
                        type="button"
                        class="list-group-item list-group-item-action"
                        disabled
                      >
                        Vestibulum at eros
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="clubName"
          type="text"
          component={renderField}
          label="Club Name"
        />
        <FieldArray name="members" component={renderMembers} />
        <nav className="nav">
          <button
            type="button"
            className="btn btn-light"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Light
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Select Ingredient
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                {renderIngredients()}
              </div>
            </div>
          </div>
        </nav>
        <Field
          name="method"
          component="textarea"
          className="form-control mt-3"
        />
        <div className="form-row mt-3">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
          <button
            className="btn btn-warning ml-2"
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

FieldArraysForm = connect(mapStateToProps)(FieldArraysForm);

export default reduxForm({
  form: "fieldArrays", // a unique identifier for this form
  validate
})(FieldArraysForm);
