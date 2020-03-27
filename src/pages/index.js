import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import throttle from 'lodash/throttle';

import introVid from '../videos/aro-video.mp4';
import logo from '../images/logo.png';
import styles from './index.module.css';
import Header from '../components/header.js';
// import VideoBanner from '../components/video-banner.js';
import Navigation from '../components/navigation.js';
// import Head from '../components/head.js';
// import Footer from '../components/footer.js';
// import building from '../../static/company.jpg';

export default class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageLoaded: false,
			pageScrolled: false
		}
		this.handlePageLoad = this.handlePageLoad.bind(this);
		this.initVideoHeaderPosition = this.initVideoHeaderPosition.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.videoHeader = React.createRef();
	}

	componentDidMount() {
		console.log(document.readyState);
		if (document.readyState === 'complete') {
			this.handlePageLoad();
		}
		else{
			let loadListener = window.addEventListener('load', this.handlePageLoad);
		}
		// this.handlePageLoad();
		this.initVideoHeaderPosition();
		let scrollListener = window.addEventListener('scroll', throttle(this.handleScroll, 100));
		// this.test = 'foobar';
		// this.dbl = window.addEventListener('dblclick', this.handlePageLoad);
		// this.load = window.addEventListener('load', ()=>console.log('loaded'));
		// this.ready = document.addEventListener('readystatechange', () => console.log('readyState', document.readyState));
		// console.log('home page mounted');
	}

	componentDidUpdate(prevProps,prevState) {
		// if(prevState.pageLoaded !== this.state.pageLoaded) {
		// 	window.objectFitPolyfill();
		// }

	}

	handlePageLoad() {
		this.setState({pageLoaded: true});
		console.log('handlePageLoadCalled');
		console.log(this.load, this.dbl, this.test);
	}

	initVideoHeaderPosition() {
		const videoHeader = document.getElementById('videoHeader');
		const initPosition = window.pageYOffset + videoHeader.getBoundingClientRect().top;
		this.setState({initVideoHeaderPosition: initPosition}); 
	}

	handleScroll() {
		// const videoHeader = document.getElementById('videoHeader');
		// const videoHeaderPosition = videoHeader.getBoundingClientRect();
		// const videoHeaderHeight = videoHeaderPosition.bottom + videoHeaderPosition.top;
		// const videoHeaderOpacity = 1 - ((this.state.initVideoHeaderPosition - videoHeaderPosition.top)/(this.state.initVideoHeaderPosition + (videoHeaderHeight/2)));
		// if(window.pageYOffset === 0) {
		// 	if(this.state.pageScrolled !== false) {
		// 		this.setState({pageScrolled: false});
		// 	}
		// 	this.videoHeader.current.style.opacity = 1;

		// }
		// else {
		// 	if(this.state.pageScrolled !== true) {
		// 		this.setState({pageScrolled: true});
		// 	}
		// 	if(videoHeaderOpacity > 0 && videoHeaderOpacity < 1) {
		// 		this.videoHeader.current.style.opacity = videoHeaderOpacity;
		// 	}
		// 	else if(videoHeaderOpacity <= 0 && this.videoHeader.current.style.opacity !== 0) {
		// 		this.videoHeader.current.style.opacity = 0;
		// 	}
		// }
	}

	render() {
		
		return (
			<React.Fragment>
				<Header active={this.state.pageScrolled}/> 

				<main role="main">
					<div className={styles.bannerContainer}>
						
						<div className={styles.videoHeading} ref={this.videoHeader} id="videoHeader" style={{opacity: 1}}>
							<h1 className={styles.h1}>Alpine Research Optics</h1>
							<h2 className={styles.bannerText}>A Precision Optics Company</h2>
							<AniLink to={'get-in-touch'} cover direction="right" duration={2} bg="#5b58a5" className={styles.contact}>Get In Touch</AniLink>
						</div>
					</div>
				</main>
				
			</React.Fragment>
		)
	}
}
