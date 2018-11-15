import React, {Component} from 'react'
import './../../client/main'
import { Link } from 'react-router-dom'
class Dashboard extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        searchTerm:"",
        searchUrl:""
      }
  
      this.handleChange.bind(this)
      this.handleKeyUp.bind(this)
    }
  
    handleKeyUp (event) {
      if(event.key === 'Enter' && this.state.searchTerm !== ""){
        var searchUrl =  "search/multi?query=" + this.state.searchTerm + "&api_key=166624c030b91c943c397020f20525b4";
        this.setState({
          searchUrl: searchUrl
        })
      }
    }
  
    handleChange(event) {
      this.setState({
        searchTerm: event.target.value
      })
    }
  
    render(){
      return (
        <div>
          <header className="Header">
            <Logo />
            <Navigation />
            <div id="search" className="Search">
              <input onChange={this.handleChange} onKeyUp={this.handleKeyUp} value={this.state.searchTerm} placeholder="Search for a title..."/>
            </div>
            <UserProfile />
          </header>
          <Hero />
          <TitleList title="Search Results" url={this.state.searchUrl}/>
          <TitleList title="Top TV picks for Jack" url='discover/tv?sort_by=popularity.desc&page=1'/>
          <TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1'/>
          <TitleList title="Most watched in Horror" url='genre/27/movies?sort_by=popularity.desc&page=1'/>
          <TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1'/>
          <TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1'/>
        </div>
      )
    }
  }
  
  class Navigation extends React.Component {
    render() {
      return(
        <div id="navigator" className="Navigation" >
          <nav>
            <ul>
              <li>Browse</li>
              <li>My List</li>
              <li>Top picks</li>
              <li>Recent</li>
            </ul>
          </nav>
        </div>
      )
    }
  }
  
  class UserProfile extends React.Component {
    render(){
      return(
        <div className="UserProfile">
          <div className="User">
            <div className="name">Jordi Gomper</div>
            <div className="image">
              <img src="https://pbs.twimg.com/profile_images/900363575767728130/f-ymAfOR_400x400.jpg" alt="profile"/>
            </div>
          </div>
        </div>
      )
    }
  }
  
  class Hero extends React.Component {
    render() {
      return(
        <div id="hero"  className="Hero" style={{backgroundImage: 'url(https://2ctptqj9vf3lafyt2rkh1qto-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/loganpaul-1.jpg)'}}>
          <div className="content">
            <img className="logo" src="https://i.pinimg.com/originals/11/4f/b5/114fb50e228758d7c5d62a0576f8d900.jpg" alt="narcos background"/>
            <h2>Logan Paul</h2>
            <p>Le youtubeur le plus connu à travers le monde</p>
            <div className="button-wrapper">
                <Link to="/video/45">
                    <HeroButton primary={true} text="Regardez maintanant"/>
                </Link>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      )
    }
  }
  
  class HeroButton extends React.Component {
    render() {
      return(
        <a a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
      )
    }
  }
  
  class TitleList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        data: [],
        mounted: false
      }
    }
  
    loadContent () {
      var requestUrl ='https://api.themoviedb.org/3/' + this.props.url + '&api_key=166624c030b91c943c397020f20525b4';
      fetch(requestUrl).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({
          data: data
        })
      }).catch((err) => {
          console.log("There has been error");
        })
    }
  
    componentWillReceiveProps(nextProps) {
      if(nextProps.url !== this.props.url && nextProps.url !== ''){
        this.setState({
          url: nextProps.url,
          mounted: true
        }, function () {
          this.loadContent();
        })   
      }
    }
  
    componentDidMount(){
      if(this.props.url !== '') {
        this.loadContent();
        this.setState({
          mounted:true
        })
      }
    }
  
    render() {
      let titles = '';
      if(this.state.data.results){
        titles = this.state.data.results.map((title, i) => {
          if(i < 5){
            var name = '';
            var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
            if(!title.name) {
              name = title.original_title;
            } else {
              name = title.name;
            }
  
            return (
              <Item key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop}/>
            )
          } else {
            return (
              <div key={title.id}></div>
            )
          }
        })
      }
  
      return(
        <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
          <div className="Title">
            <h1>{this.props.title}</h1>
            <div className="titles-wrapper">
              {titles}
            </div>
          </div>
        </div>
      )
    }
  }
  
  class Item extends React.Component {
    render() {
      return(
        <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}}>
          <div className="overlay">
            <div className="title">{this.props.title}</div>
            <div className="rating">{this.props.score} / 10</div>
            <div className="plot">{this.props.overview}</div>
            <ListToggle />
          </div>
        </div>
      )
    }
  }
  
  class ListToggle extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        toggled:false
      }
    }
  
    handleClick () {
      if(this.state.toggled === true) {
        this.setState({
          toggled: false
        })
      } else {
        this.setState({
          toggled: true
        })
      }
    }
  
  
    render() {
      return(
        <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
          <div>
            <i className="fa fa-fw fa-plus"></i>
            <i className="fa fa-fw fa-check"></i>
          </div>
        </div>
      )
    }
  }
  
  class Logo extends React.Component {
    render() {
      return (
        <div id="logo" className="Logo">
        <img className="logo" width="300" height="81.386726" src="/client/img/logo.png" alt="narcos background"/>
          
        </div>
      );
    }
  }
  
export default Dashboard