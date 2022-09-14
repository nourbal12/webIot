import React, {Component} from 'react'
import toastr from 'cogo-toast';
import axios from 'axios';
import { CChart } from '@coreui/react-chartjs';
import { DataGrid} from '@mui/x-data-grid';
import { Sidenav, Nav, Dropdown } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import { Bar } from 'react-chartjs-2';
import {CategoryScale,Chart} from 'chart.js';
import { Card } from 'react-bootstrap';
import {  registerables } from 'chart.js';
Chart.register(...registerables);
export const options = {
	responsive: true,
	plugins: {
	  legend: {
		position: 'top' ,
	  },
	 
	},

  };
  
class Index extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			values   : [],
			postsPerPage:500,
			currentPage:1
			
		}
		
		Chart.register(CategoryScale);
       // this.mid=this.params.lo
       // const search =  useLocation().search;
       // var mid = new URLSearchParams(search).get('mid');
       this.mid = this.props.history.location.state.mid;
        console.log("loc",this.props)



        
		
		this.handleUpdateState = this.handleUpdateState.bind(this);
		
	}
	//--- Fetch all modules info before the component render ---//
	componentDidMount()
	{
		axios.get('/api/values')
			.then(response => {
                console.log(response.data);
				this.setState({
					values : response.data.filter(item => item.mid == this.mid)
				})
			})
	}
	
    handleUpdateState(data, operation)
	{
		//--- 'operation==1' means update module ---//
		if(operation === 1) {
			this.setState(prevState => ({
				values : prevState.values.filter(value => {
					if(value.mid === data.mid)
						return Object.assign(value, data);
					else
						return value;
				})
			}))
			return;
		}
		//--- 'operation==0' means insert module ---//
		var new_values = this.state.values.concat(data);
		this.setState({
			values : new_values
		})
	}
	
	showpaginData=()=>{
		const columns =[
			{ field: 'vid', headerName: 'Valeur_Id', width: 150 },
			{ field: 'mid', headerName: 'Module_id', width: 150 },
			{ field: 'valeur', headerName: 'Valeur_Mesurée(Donnée envoyée)', width: 150 },
			{ field: 'Created_at', headerName: 'Historique(Created_At)', width: 150 },]
		
		  
		const {postsPerPage,currentPage,values}=this.state;
		const indexOfLastPage=currentPage*postsPerPage;
		const indexOfFirstPage=indexOfLastPage-postsPerPage;
		const currentPost=values.slice(indexOfFirstPage,indexOfLastPage)
		return (
			<div style={{ height: 400, width: '100%' }}>
			  <DataGrid
			  getRowId={(row) => row.vid}
			   columns={columns}
				rows={currentPost}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			  />
			</div>
		  );
	}
	
	
	//--- Delete module and update state ---//
	handleDeletevalue(valueId)
	{
		axios.delete(`/api/values/${valueId}`)
			.then(response => {
				toastr.error('value has been deleted successfully!', {position : 'top-right', heading: 'Done'});
				
				this.setState(prevState => ({
					values : prevState.values.filter(value => {
						return value.vid !== valueId
					})
				}))
			})
	}
	nextPath(path) {
        this.props.history.push(path)
      }
render() {
    return(
		<>
		<div style={{background:"linear-gradient(blue,pink)"}}>
		 <div style={{
      display: 'block', paddingLeft: 0
    }}>
	<div>
      <Sidenav defaultOpenKeys={['3', '4']} activeKey="1">
        <Sidenav.Body>
          <Nav>
            <Dropdown eventKey="4" title="Home" onClick={() => this.nextPath('/')}>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
		
		<div style={{width: 600,
		marginTop:30,
    marginLeft:' auto',
    marginRight:' auto',
	backgroundColor:'white'
	}}>
		<table className="table table-bordered" id="table-container">


			{this.showpaginData()}



		</table>
		</div>
		
	    <div style={{
    marginLeft:' auto',
    marginRight:' auto',width: 600,}}>
		<Card variant="outlined" style={{backgroundColor:'rgb(240,240,240)',boxShadow: ' 0 0 2em white'}} 
   >
	 <h6 style={{textAlign:'center',color:'linear-gradient(blue,pink)'}}>Courbe en Ligne de valeurs mesurées au fonction de l'historique</h6>
		<CChart
				type="line"
				data={{
					labels: this.state.values.map(value => value.Created_at),
					datasets: [
						{
							label: "My dataset",
							backgroundColor: "rgba(151, 187, 205, 0.2)",
							borderColor: "rgba(151, 187, 205, 1)",
							pointBackgroundColor: "rgba(151, 187, 205, 1)",
							pointBorderColor: "#fff",
							data: this.state.values.map(value => value.valeur)
						},
					],
				}} />
				</Card>
				
				
				<hr></hr>
				
				<Card variant="outlined" style={{backgroundColor:'rgb(240,240,240)',boxShadow: ' 0 0 2em white'}}>
				<h6 style={{textAlign:'center'}}>Courbe en batton des valeurs mesurées au fonction de l'historique</h6>
				<Bar options={options} data={{
					labels: this.state.values.map(value => value.Created_at),
					datasets: [
						{
							label: "My dataset",
							backgroundColor: "pink",
							borderColor: "blue",
							pointBackgroundColor: "blue",
							pointBorderColor: "#fff",
							data: this.state.values.map(value => value.valeur)
						},
					],
				}} /></Card></div></div></div>
				
</>
)}
	
}
export default Index