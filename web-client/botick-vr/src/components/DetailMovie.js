import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Listpage from './Listpage'
import './DetailMovie.css'
import firebase from './firebase.js'


var database = firebase.database();
var fireSeat = database.ref('/')


class DetailMovie extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movieId: props.match.params.id,
      movie: props.location.state.movie,
      studio: props.location.state.studio
    }
  }

  getStudio (studioId, startTime) {

    return this.state.studio.map(std => {
      if (studioId === std._id) {
        return (
          <div>
            <h3>Studio {std.name}</h3>
            <button><h2>{startTime}</h2></button>
          </div>
        )
      }
    })
  }

  renderMovieShowTime () {

    return this.state.studio.map(std => {
      var times = this.state.movie._movieShowTimeId.filter( showtime => {
        return std._id === showtime._studioId
      })
      return (
        <div>
          <h3>Studio {std.name}</h3>
          {
            times.map((time,idx) => {
              console.log(time);
              return (
                <Link  key={idx} to= {{
                    pathname: `/booking/${time._id}`,
                    state: {
                      showtimeData : [time, std]
                    }
                  }} className= 'btn btn-primary' style = {{marginRight : '20px'}}><h2>{time.startTime}</h2></Link>
              )
            })
          }
        </div>
      )
    })
  }

  render () {
    console.log('---------------', this.state.movie)
    return (
      <div className='container'>
        <div className='row' style={{'margin': '20px'}}>
          <h1 style={{textAlign: 'center'}}>{this.state.movie.title}</h1>
          <hr className='col-md-12' style={{ marginBottom: '30px' }} />
          <div className='col-md-4'>
            <img style={{width: 'auto', height: '500px'}} src={this.state.movie.poster} />
          </div>
          <div className='col-md-6'>
            <iframe width='720px' height='500px' src={`http://www.youtube.com/embed/` + this.state.movie.trailer.split('/')[3]} />

          </div>
        </div>
        <Listpage text={this.state.title} />
        <div className='row detail'>
          <div className='col-md-4'>
            <ul>
              <li><span>Casts</span>
              : {
                  this.state.movie.casts.map((actor, idx) => {
                    return (
                      <span key={idx}>{actor}, </span>
                    )
                  })
                }
              </li>
              <li>
                <span>Genre</span>
                : {this.state.movie.genre.join(', ')}
              </li>
              <li>
                <span>Rate</span>
                : {this.state.movie.rate}
              </li>
              <li>
                <span>Productions</span>
                : {this.state.movie.production}
              </li>
            </ul>
          </div>
          <div className='col-md-6'>
            <p>{this.state.movie.overview}</p>
          </div>
        </div>

        <hr className='col-md-12' style={{'margin': '10px 0px 10px 0px'}}/>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Schedule</h2>

            <hr className='col-md-12' style={{'margin': '10px 0px 10px 0px'}}/>
            <table className='table'>
              <tbody>
                {this.renderMovieShowTime()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailMovie
