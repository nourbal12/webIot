import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Edit extends Component
{
	constructor()
	{
		super();
		//--- Declare method for this component ---//
		this.state = {
			errors    : [],
			mid        : '',
			nom : '',
            unite:'',
			description : '',
			valMax 	  : '',
            valMin	  : ''
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleUpdateModule = this.handleUpdateModule.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Receive props while update modal open ---//
	UNSAFE_componentWillReceiveProps(Module_data) 
	{
		this.setState({
			mid        : Module_data.module.mid,
			nom : Module_data.module.nom,
            unite : Module_data.module.unite,
			description : Module_data.module.description,
			valMax     : Module_data.module.valMax,
            valMin   : Module_data.module.valMin
		})
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	//--- Update state Modules variable by props method ---//
	handleUpdateModule(e)
	{
		e.preventDefault()
		//--- Declare state variable for this component ---//
		const data = {
			mid   : this.state.mid,
			nom : this.state.nom,
			description : this.state.description,
            unite : this.state.unite,
			valMax     : this.state.valMax,
            valMin    : this.state.valMin
		}
		axios.put(`/api/modules/${this.state.mid}`, data)
			.then(response => {
				this.props.updateState(data, 1);
				this.setState(this.baseState);
				document.getElementById("closeEditModal").click();
				toastr.info('Module data updated successfully!', {position : 'top-right', heading: 'Done'});
			})
			.catch(error => {
				this.setState({
					errors : error.response.data.errors
				})
			})
	}
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName)
	{
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName)
	{
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Update Module information</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleUpdateModule}>
			      		<div className="modal-body">
                          <div className="form-group">
			            		<label htmlFor="mid" className="col-form-label">Mid</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('mid') ? 'is-invalid' : ''}`}
			            		 id="mid" name="mid" placeholder="Module name" onChange={this.handleInputFieldChange} value={this.state.mid}/>
			            		{this.renderErrorFor('mid')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="nom" className="col-form-label">Nom:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('Nom') ? 'is-invalid' : ''}`}
			            		 id="nom" name="nom" placeholder="Module name" onChange={this.handleInputFieldChange} value={this.state.nom}/>
			            		{this.renderErrorFor('nom')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="description" className="col-form-label">Description</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
			            		 id="description" name="description" placeholder="Mobile no" onChange={this.handleInputFieldChange} value={this.state.description}/>
			            		{this.renderErrorFor('description')}
			          		</div>
                              <div className="form-group">
			            		<label htmlFor="unite" className="col-form-label">unité</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('unite') ? 'is-invalid' : ''}`}
			            		 id="unite" name="unite" placeholder="unité" onChange={this.handleInputFieldChange} value={this.state.unite}/>
			            		{this.renderErrorFor('unite')}
			          		</div>
			          		<div className="form-group">
			            		<label htmlFor="valMax" className="col-form-label">valMax:</label>
			            		<input type="number" className={`form-control form-control-sm ${this.hasErrorFor('valMax') ? 'is-invalid' : ''}`}
			            		 id="valMax" name="valMax" placeholder="valMax" onChange={this.handleInputFieldChange} value={this.state.valMax}/>
			            		{this.renderErrorFor('valMax')}
			          		</div>
                              <div className="form-group">
			            		<label htmlFor="valMin" className="col-form-label">valMin:</label>
			            		<input type="number" className={`form-control form-control-sm ${this.hasErrorFor('valMin') ? 'is-invalid' : ''}`}
			            		 id="valMin" name="valMin" placeholder="valMin" onChange={this.handleInputFieldChange} value={this.state.valMin}/>
			            		{this.renderErrorFor('valMax')}
			          		</div>
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeEditModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Edit