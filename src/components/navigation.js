import React from 'react';
// import { Link }	from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

import DropDownMenu from './drop-down-menu.js';
import styles from './navigation.module.css';

const navItems = {
	Products: ['Catalog', 'Mirrors & Windows', 'Prisms & Beamsplitters', 'Polarizers', 'Waveplates'],
	Markets: ['Medical', 'Semiconductors', 'Research'],
	Quality: ['ISO 9001', 'Compliance', 'ITAR', 'CMRT Policy', 'Metrology'],
	Company: ['Supplier Portal', 'Work With Us', 'About Us', 'Facility'],
	'Get In Touch': []
}

const initSubMenuState = {};
Object.keys(navItems).forEach((item, index) => {
  initSubMenuState[item.toLowerCase()] = false;
})
// <li className={styles.li}><AniLink to="/" cover direction="right" duration={2} bg="#5b58a5" className={styles.link}>Home</AniLink></li>
export default class Navigation extends React.Component {
	constructor(props) {
		console.log(initSubMenuState)
		super(props);
		this.state = {
			showResponsiveMenu: false,
			showSubMenus: initSubMenuState,
		}
		this.toggleResponsiveMenu = this.toggleResponsiveMenu.bind(this);
		this.toggleSubMenus = this.toggleSubMenus.bind(this);
	}

	// close the sub menus when there is a click anywhere on the document besides a menu
	componentDidMount() {
		console.log('I mounted');
		window.addEventListener('click', () => {
			this.setState({showSubMenus: initSubMenuState});
			console.log('menu is clearing');
		});
	}

	toggleResponsiveMenu() {
		console.log('showResponsiveMenu', this.state.showResponsiveMenu);
		this.setState(state => ({
			showResponsiveMenu: !state.showResponsiveMenu
		}));
	}

	toggleSubMenus(event) {
		event.stopPropagation();
		console.log('subMenu',event.target.id);
		console.log('navState',this.state.showSubMenus);
		let selectedSubMenu = event.target.id;
		let updatedSubMenus = {};
		Object.keys(this.state.showSubMenus).forEach(subMenu => {
			selectedSubMenu === subMenu ? updatedSubMenus[subMenu] = true : updatedSubMenus[subMenu] = false;
		});
		this.setState({showSubMenus: updatedSubMenus});	
	}
	
	render () {
		const navList = Object.keys(navItems).map((item, index) => {
			if(!navItems[item] || navItems[item].length <= 0) {
				if(this.props.hasTopLevelLink === true) {
					return(
						<li key={item} className={styles.navMenuItem}>
							<AniLink to={item.toLowerCase().replace(/ /g,'-')} cover direction="right" duration={2} bg="#5b58a5" id={item.toLowerCase().replace(/ /g,'-')} className={styles.navButton}>
								{item}
							</AniLink>
						</li>
					)
				}
				else {
					return; 
				}
			}
			return (
				<li key={item} className={styles.navMenuItem}>
					<DropDownMenu id={item.toLowerCase().replace(/ /g,'-')} subMenuItems={navItems[item]} handleClick={this.toggleSubMenus} showMenu={this.state.showSubMenus[item.toLowerCase()]} buttonName={item} buttonClassNames={`${styles.navButton} ${this.props.active && styles.active}`}/>
				</li>
			);
		});

		return (
			<nav role="navigation" className={styles.nav}>
				{this.state.showResponsiveMenu ? (
					<React.Fragment>
						<button className={styles.closeMenuButton} onClick={this.toggleResponsiveMenu}>X</button>
						<div className={`${styles.navMenuContainer} ${styles.showResponsiveMenu}`}>
							<ul className={styles.navMenu}>
								{navList}
							</ul>
						</div>
					</React.Fragment> )
				:(
					<React.Fragment>
						<button className={styles.openMenuButton} onClick={this.toggleResponsiveMenu}><FontAwesomeIcon icon={faBars}/></button>
						<div className={styles.navMenuContainer}>
							<ul className={styles.navMenu}>
								{navList}
							</ul>
						</div>
					</React.Fragment> )}
			</nav>
		);
	}
}