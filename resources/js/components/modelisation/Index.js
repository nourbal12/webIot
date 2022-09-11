
import React, {Component} from 'react'
import toastr from 'cogo-toast';
import axios from 'axios'
class Index extends Component
{
	constructor()
	{
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			values   : [],
			
		}
		//--- Declare method for this component ---//
		this.handleUpdateState = this.handleUpdateState.bind(this);
	}
	//--- Fetch all modules info before the component render ---//
	componentDidMount()
	{
		axios.get('/api/values')
			.then(response => {
				this.setState({
					values : response.data
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

render() {
    return(
        <table className="table table-bordered">
        <thead>
            <tr>
                <th> Mid</th>
                <th> valeur </th>
                <th> created_at </th>
                
            </tr>
        </thead>
        <tbody>
            {this.state.values.map((value, i) => (
                <tr key={i}>
                    <td> {value.mid} </td>
                    <td> {value.valeur} </td>
                    <td> {value.created_at} </td>
                   
                    <td>
                        

                    </td>
                </tr>
            ))}
        </tbody>
    </table>
      )
    }
}
export default Index