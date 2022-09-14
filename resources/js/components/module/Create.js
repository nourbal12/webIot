import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Create extends Component
{
	constructor()
	{
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			errors    : [],
			nom : '',
			description : '',
            unite : '',
			valMax 	  : '',
            valMin	  : ''
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleInsertModule = this.handleInsertModule.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	//--- Insert new Module in Modules state array by props method ---//
	handleInsertModule(e)
	{
		e.preventDefault()
		const data = {
			nom : this.state.nom,
			description : this.state.description,
            unite : this.state.unite,
			valMax     : this.state.valMax,
            valMin     : this.state.valMin
		}
		axios.post('/api/modules', data)
			.then(repsonse => {
				this.setState(this.baseState);
				delete repsonse.data.created_at;
				delete repsonse.data.updated_at;
				this.props.updateState(repsonse.data, 0);

				document.getElementById("closeAddModal").click();
				toastr.success('New Module added successfully!', {position : 'top-right', heading: 'Done'});
			})
			.catch(error => {
				this.setState({
					errors : error.response.data.errors
				})
			})
	}
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(nom)
	{
		return !!this.state.errors[nom];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(nom)
	{
    	if (this.hasErrorFor(nom)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[nom][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header" style={{background:'linear-gradient(blue,pink)'}}>
			        		<h5 className="modal-title">New Module</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleInsertModule}>
			      		<div className="modal-body">
			          		<div className="form-group">
			            		<label htmlFor="nom" className="col-form-label">Nom</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('nom') ? 'is-invalid' : ''}`}
			            		 id="nom" name="nom" placeholder="nom" onChange={this.handleInputFieldChange} value={this.state.nom}/>
			            		{this.renderErrorFor('nom')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="description" className="col-form-label">Description</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
			            		 id="description" name="description" placeholder="description" onChange={this.handleInputFieldChange} value={this.state.description}/>
			            		{this.renderErrorFor('description')}
			          		</div>
                              <div className="form-group">
			            		<label htmlFor="unite" className="col-form-label">unité</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('unite') ? 'is-invalid' : ''}`}
			            		 id="unite" name="unite" placeholder="unite" onChange={this.handleInputFieldChange} value={this.state.unite}/>
			            		{this.renderErrorFor('unite')}
			          		</div>
                              <div className="form-group">
			            		<label htmlFor="valMax" className="col-form-label">val Max</label>
			            		<input type="number" className={`form-control form-control-sm ${this.hasErrorFor('valMax') ? 'is-invalid' : 0}`}
			            		 id="valMax" name="valMax" placeholder="valMax" onChange={this.handleInputFieldChange} value={this.state.valMax}/>
			            		{this.renderErrorFor('valMax')}
			          		</div>
			          		<div className="form-group">
			            		<label htmlFor="valMin" className="col-form-label">val Min</label>
			            		<input type="number" className={`form-control form-control-sm ${this.hasErrorFor('valMin') ? 'is-invalid' : 0}`}
			            		 id="valMin" name="valMin" placeholder="valMin" onChange={this.handleInputFieldChange} value={this.state.valMin}/>
			            		{this.renderErrorFor('valMin')}
			          		</div>
                              
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeAddModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save Module</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Create