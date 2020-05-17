import React, {Component} from 'react';

import * as FirestoreService from '../../Services/firebase';
import logo from '../../logo.svg';
import './Home.css';

class Home extends Component {
    componentDidMount() {
        // FirestoreService.createGroceryList('Name', 'id');
        // Use the following to populate the database
        // FirestoreService.createEventsList();

        // let orderBy = {
        //     sortBy: 'Event End Date',
        //     sortDirection: 'asc',
        //     filters: [
        //         'ShowPastEvents',
        //         'RecentlyEndedEvents',
        //         'CallForProposalsOpen',
        //     ],
        // };
        // FirestoreService.getOrderedEventsList(orderBy, 10)
        //     .then(docs => console.log(docs))

        // console.log(docs);
        // FirestoreService.getEventById('M6HazrVzoRNzH7RDBjYn')
        //     .then(docs => console.log(docs));

    }
    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                    <img src={logo} className="Home-logo" alt="logo"/>
                    <p>
                        Edit <code>src/Home.js</code> and save to reload.
                    </p>
                    <a
                        className="Home-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default Home;
