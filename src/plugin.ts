import {
  JupyterLab, JupyterLabPlugin
} from 'jupyterlab/lib/application';

import {
  ICommandPalette
} from 'jupyterlab/lib/commandpalette';

import {
  DistributedUIElement
} from './widget'

const URL = '127.0.0.1'
const PORT = '8787'

const SCRIPTS = [
  {
    src: `http://${URL}:${PORT}/resource_profile/autoload.js?bokeh-autoload-element=0938e7ff-da78-4769-bf7f-b31d99fd9680`,
    bokeh_id: "0938e7ff-da78-4769-bf7f-b31d99fd9680",
    id: "distributed-ui:bk-resource-profile-plot",
    text: "Resource Profile",
    "data-bokeh-model-id": "bk-resource-profile-plot",
    "data-bokeh-doc-id": ""
  },
  {
    src: `http://${URL}:${PORT}/network_profile/autoload.js?bokeh-autoload-element=0938e7ff-da78-4769-bf7f-b31d99fd9681`,
    bokeh_id: "0938e7ff-da78-4769-bf7f-b31d99fd9681",
    id: "distributed-ui:bk-network-profile-plot",
    text: "Network Profile",
    'data-bokeh-model-id': "bk-network-profile-plot",
    'data-bokeh-doc-id': ""
  },
  {
    src: `http://${URL}:${PORT}/memory_usage/autoload.js?bokeh-autoload-element=0938e7ff-da78-4769-bf7f-b31d99fd9682`,
    bokeh_id: "0938e7ff-da78-4769-bf7f-b31d99fd9682",
    id: "distributed-ui:bk-nbytes-plot",
    text: "Memory Use",
    'data-bokeh-model-id': "bk-nbytes-plot",
    'data-bokeh-doc-id': ""
  },
  {
    src: `http://${URL}:${PORT}/task_stream/autoload.js?bokeh-autoload-element=0938e7ff-da78-4769-bf7f-b31d99fd9683`,
    bokeh_id: "0938e7ff-da78-4769-bf7f-b31d99fd9683",
    id: "distributed-ui:bk-task-stream-plot",
    text: "Task Stream",
    'data-bokeh-model-id': "bk-task-stream-plot",
    'data-bokeh-doc-id': ""
  },
  {
    src: `http://${URL}:${PORT}/progress_stream/autoload.js?bokeh-autoload-element=0938e7ff-da78-4769-bf7f-b31d99fd9684`,
    bokeh_id: "0938e7ff-da78-4769-bf7f-b31d99fd9684",
    id: "distributed-ui:bk-progress-plot",
    text: "Progress Stream",
    'data-bokeh-model-id': "bk-progress-plot",
    'data-bokeh-doc-id': ""
  },
  {
    src: `http://${URL}:${PORT}/processing/autoload.js?bokeh-autoload-element=0938e7ff-da78-4769-bf7f-b31d99fd9685`,
    bokeh_id: "0938e7ff-da78-4769-bf7f-b31d99fd9685",
    id: "distributed-ui:bk-processing-plot",
    text: "Processing and Pending",
    'data-bokeh-model-id': "bk-processing-plot",
    'data-bokeh-doc-id': ""
  },
  {
    src: `http://${URL}:${PORT}/worker_memory/autoload.js?bokeh-autoload-element=0938e7ff-da78-4769-bf7f-b31d99fd9686`,
    bokeh_id: "0938e7ff-da78-4769-bf7f-b31d99fd9686",
    id: "distributed-ui:bk-memory-usage-plot",
    text: "Worker Memory",
    'data-bokeh-model-id': "bk-memory-usage-plot",
    'data-bokeh-doc-id': ""
  },
  {
    src: `http://${URL}:${PORT}/workers_table/autoload.js?bokeh-autoload-element=0938e7ff-da78-4769-bf7f-b31d99fd9687`,
    bokeh_id: "0938e7ff-da78-4769-bf7f-b31d99fd9687",
    id: "distributed-ui:bk-worker-table",
    text: "Workers Table",
    'data-bokeh-model-id': "bk-worker-table",
    'data-bokeh-doc-id': ""
  }
];

/**
 * A namespace for help plugin private functions.
 */
const distributedUILab: JupyterLabPlugin<void> = {
  id: 'jupyter.extensions.dask-labextension',
  requires: [ICommandPalette],
  activate: activateDistributedUILab,
  autoStart: true
}

export default distributedUILab;

/**
 * Activate the bokeh application extension.
 */
function activateDistributedUILab(app: JupyterLab, palette: ICommandPalette): void {

  let elements: Array<DistributedUIElement> = [];

  for (let script of SCRIPTS) {
    elements.push(new DistributedUIElement(script))
  }

  // Register commands for each DistributedUIElement
  elements.forEach(element => app.commands.addCommand(element.id, {
    label: element.title.label,
    execute: () => {
      app.shell.addToMainArea(element)
    }
  }))

  // Add a palette element for each DistributedUIElement command
  elements.forEach(element => palette.addItem({
    command: element.id,
    category: "Dask Distributed UI"
  }))
}
