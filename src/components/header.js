import React from 'react';

import logo from '../images/logo.png';
import Navigation from './navigation.js';
import styles from './header.module.css';

export default function Header(props) {
	return(
		<header className={styles.landingHeader} role="banner">
			<div className={`${styles.logoNavContainer} ${props.active && styles.active}`}>
				<img className={styles.logo} src={logo} alt="PFG Optics Logo"/>
				<Navigation hasTopLevelLink={false} active={props.active ? "active" : null}/>
			</div>
		</header>
	);
}