import { LitElement, html, css } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import {
  ListDashboardResponse,
  ListDashboardGroupResponse,
} from './gen/pb/api/v1/data.js';
// import { styles } from './styles.js';
import '@material/mwc-button';
import '@material/mwc-list';

@customElement('testgrid-index')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TestgridIndex extends LitElement {
  @state()
  @property({ type: String })
  title: string = 'My app';

  @property({ type: Array<string> }) dashboards: Array<string> = [];

  @property({ type: Array<string> }) dashboardGroups: Array<string> = [];

  @property({ type: Array<string> }) respectiveDashboards: Array<string> = [];
  // TODO(chases2): inject an APIClient object so we can inject it into tests/storybook later

  // writing a function which renders dashboards when clicked on dashboard groups

  render() {
    return html`
      <mwc-button class="button" raised @click="${
        this.callAPI
      }">Call API</mwc-button>

    <!-- loading dashboards -->
    <div class="flex-container">
      <div>
        <mwc-list class="column">
          ${map(this.dashboards, (dash: string, index: number) => {
            if (index !== 0) {
              return html`
                <mwc-list-item class="card dashboard">
                  <div class="container">
                    <p>${dash}</p>
                  </div>
                </mwc-list-item>
              `;
            }
            return html`<mwc-list-item class="card dashboard">
              <div class="container">
                <p>${dash}</p>
              </div>
            </mwc-list-item>`;
          })}
        </mwc-list>
      </div>

      <!-- loading dashboard groups -->
      <mwc-list class="column">
        ${map(this.dashboardGroups, (dash: string, index: number) => {
          if (index !== 0) {
            return html`
              <mwc-list-item class="card dashboard-group">
                <div class="container">
                  <mwc-button raised @click="${this.getRespectiveDashboards}"
                    >${dash}</mwc-button
                  >
                </div>
              </mwc-list-item>
            `;
          }
          return html`<mwc-list-item class="card dashboard-group">
            <div class="container">
              <p>${dash}</p>
            </div>
          </mwc-list-item>`;
        })}
      </mwc-list>
      </div>
    </div>
    `;
  }

  getDashboards() {
    this.dashboards = ['Loading...'];

    fetch('http://testgrid-data.k8s.io/api/v1/dashboards').then(
      async response => {
        const resp = ListDashboardResponse.fromJson(await response.json());

        this.dashboards = [];

        resp.dashboards.forEach(db => {
          this.dashboards.push(db.name);
        });
      }
    );
  }

  getDashboardGroups() {
    this.dashboardGroups = ['Loading...'];

    fetch('http://testgrid-data.k8s.io/api/v1/dashboard-groups').then(
      async response => {
        const resp = ListDashboardGroupResponse.fromJson(await response.json());

        this.dashboardGroups = [];

        resp.dashboardGroups.forEach(db => {
          this.dashboardGroups.push(db.name);
        });
      }
    );
  }

  async getRespectiveDashboards() {
    this.respectiveDashboards = ['Loading...'];
    try {
      fetch(
        'http://testgrid-data.k8s.io/api/v1/dashboard-groups/cert-manager'
      ).then(async response => {
        const resp = ListDashboardResponse.fromJson(await response.json());

        this.respectiveDashboards = [];

        resp.dashboards.forEach(ts => {
          this.respectiveDashboards.push(ts.name);
        });
      });
    } catch (error) {
      console.error(`Could not get dashboard summaries: ${error}`);
    }
  }

  // call both of these at same time
  callAPI() {
    this.getDashboards();
    this.getDashboardGroups();
    // this.getRespectiveDashboards();
  }

  static styles = css`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      /* max-width: 960px; */
      margin: 0 auto;
      text-align: center;
      background-color: var(--example-app-background-color);
    }

    .button {
      width: 200px;
    }

    .flex-container {
      display: flex;
      flex-direction: row;
      max-width: 500px;
    }

    .column {
      flex: 50%;
      padding: 10px;
    }

    .card {
      /* Add shadows to create the "card" effect */
      transition: 0.3s;
      margin-bottom: 10px;
      box-shadow: 0 30px 30px -25px rgba(#4133b7, 0.25);
      border-radius: 3px;
    }

    .dashboard {
      background-color: #ddc5fb;
    }

    .dashboard-group {
      background-color: #8692ff;
    }

    /* On mouse-over, add a deeper shadow */
    .card:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    /* Add some padding inside the card container */
    .container {
      padding: 2px 16px;
    }
  `;
}
