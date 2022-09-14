import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'
import axios from 'axios'
import '../../../sass/app.scss';
import '../../../sass/app.scss';
require('../../bootstrap');
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

class Index extends Component
{
	constructor()
	{
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			modules    : [],
			editmodule : {}
		}
		//--- Declare method for this component ---//
		this.handleUpdateState = this.handleUpdateState.bind(this);
	}
	//--- Fetch all modules info before the component render ---//
	componentDidMount()
	{
		axios.get('/api/modules')
			.then(response => {
				this.setState({
					modules : response.data
				})
			})
	}
	//--- Update state variable while any module insert or update ---//
	handleUpdateState(data, operation)
	{
		//--- 'operation==1' means update module ---//
		if(operation === 1) {
			this.setState(prevState => ({
				modules : prevState.modules.filter(module => {
					if(module.mid === data.mid)
						return Object.assign(module, data);
					else
						return module;
				})
			}))
			return;
		}
		//--- 'operation==0' means insert module ---//
		var new_modules = this.state.modules.concat(data);
		this.setState({
			modules : new_modules
		})
	}
	//--- Find editable module and update state variable ---//
	handleEditmodule(moduleId)
	{
		axios.get(`/api/modules/${moduleId}/edit`)
			.then(response => {
				this.setState({
					editmodule : response.data
				})
			})
	}
	//--- Delete module and update state ---//
	handleDeletemodule(moduleId)
	{
		axios.delete(`/api/modules/${moduleId}`)
			.then(response => {
				toastr.error('module has been deleted successfully!', {position : 'top-right', heading: 'Done'});
				
				this.setState(prevState => ({
					modules : prevState.modules.filter(module => {
						return module.mid !== moduleId
					})
				}))
			})
	}
	
    nextPath(path, mid) {
        this.props.history.push(path, {mid: mid})
      }
    render() {
      return(
        <>
		<div style={{backgroundImage:`url("https://img.freepik.com/vecteurs-premium/internet-objets-iot_35632-74.jpg?w=2000")`}}>
     <div style={{width:700,padding:30,background:"linear-gradient(blue,pink)"}}>
				
	 <Carousel>
				   <Carousel.Item interval={1500}>
					   <img
						   className="d-block w-100"
						   src="https://www.objetconnecte.com/wp-content/uploads/2021/07/ingestion-donnees-iot-problemes-1.png"
						   alt="Image One" />
					   
				   </Carousel.Item>
				   <Carousel.Item interval={500}>
					   <img
						   className="d-block w-100"
						   src="https://static.wixstatic.com/media/25418e_bb306fe3495b4e4893aabe7520aa3a0a~mv2.jpg/v1/fit/w_800%2Ch_456%2Cal_c%2Cq_80/file.jpg"
						   alt="Image Two" />
					  
				   </Carousel.Item>
			   </Carousel>
			   
			<div className="card mt-4" id="card" >
			<div className="card-header">
			   <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#addModal"> Add module </button>
			   </div>
					<div className="card-body">
						<div className="col-md-12" >
							<table className="table table-bordered" id="table-container">
								<thead>
									<tr>
										<th> Mid</th>
										<th> Nom </th>
										<th> Description </th>
										<th> Max valeur </th>
										<th> Min valeur </th>
									</tr>
								</thead>
								<tbody>
									{this.state.modules.map((module, i) => (
										<tr key={i}>
											<td> {module.mid} </td>
											<td> {module.nom} </td>
											<td> {module.description} </td>
											<td> {module.valMax} </td>
											<td> {module.valMin} </td>
											<td>
												<button className="btn btn-secondary btn-sm mr-2" onClick={this.handleEditmodule.bind(this, module.mid)} data-toggle="modal" data-target="#editModal"> Edit </button>
												<button className="btn btn-danger btn-sm" onClick={this.handleDeletemodule.bind(this, module.mid)}> Delete </button>
												<hr></hr>
												<button className="btn btn-primary btn-sm mr-2" onClick={() => this.nextPath('/values', module.mid)}> Modelise </button>

											</td>
										</tr>
									))}
								</tbody>
							</table>

						</div>
					</div>
					<Create updateState={this.handleUpdateState} />
					<Edit updateState={this.handleUpdateState} module={this.state.editmodule} />

				</div>
					 </div></div></>
        )
    }
}
	
export default Index