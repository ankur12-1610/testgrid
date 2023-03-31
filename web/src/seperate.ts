// import { map } from 'lit/directives/map.js';
// import { ListDashboardResponse, ListDashboardGroupResponse } from './gen/pb/api/v1/data.js';

// // storing dashboards and dashboard groups
// const dashboards: Array<String> = [];
// const dashboardGroups: Array<string> = [];

// let dashboardGroupHashMap = new Map();

// // loading dashboards
// fetch('https://testgrid-data.k8s.io/api/v1/dashboards').then(async response => {
//     const resp = ListDashboardResponse.fromJson(await response.json());

//     resp.dashboards.forEach(db => {
//         dashboards.push(db.name);
//     });
// });

// // loading dashboard groups
// fetch('https://testgrid-data.k8s.io/api/v1/dashboard-groups').then(async response => {
//     const resp = ListDashboardGroupResponse.fromJson(await response.json());
//     resp.dashboardGroups.forEach(db => {
//         dashboardGroups.push(db.name);
//     });
// });

// // checking if dashboards and dashboard groups don't coincide
// for(let i=0; i<dashboardGroups.length; i++) {
//     for(let j=0; j<dashboards.length; j++) {
//         if(dashboards[j].includes(dashboardGroups[i])) {
//             dashboardGroupHashMap[dashboardGroups[i]]++;
//         }
//     }
// }
