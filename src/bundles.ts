// main bundle (order doesn't matter)
import './utils/fetch';
import './services/fetchservice';
import './services/navservice';
import './utils/demoFetch'; // must be after ./utils/fetch

// Independent Bundles
import './bundles/teamRegistration';
import './bundles/tasksRegistration';
