import {CREATE_NETWORK_CLASS, CREATE_NETWORK_MODAL} from './constants'
import { queryNetworkDatabase } from './api/grnsight-api';

export const createNetwork = function () {
	const createHTMLforForm = (sources) => {
		let result =  `
			<form id=\'createNetworkForm\'>
				<h2 id=\'createNetwork\'>Create Network</h2>
        <div class=\'form-group\'>
          <label for=\'network-source\' id=\'network-source-label\'>Network Source</label>
          <select class=\'network-dropdown\' id=\'network-source\'>
            <option value=\'none\' selected=\'true\' disabled hidden>Select Network Source</option> 
					`
		for (let source in sources) {
			result += `
						<option value=\'${source}\'>${sources[source]}</option>
			`
		}
		result += `</select>
				</div>
        <div class=\'form-group\'>
					<label for=\'network-search-bar\' id=\'network-source-label\'>Select genes</label>
					<input type=\'search\' id=\'network-search-bar\' name=\'network-search-bar\'>
          </input>
          <a href=\'#\' id=\'enter-search\'>
            <span class=\'glyphicon glyphicon-search\'></span>
          </a>
        </div>
        <div id=\'selected-genes\'>
          <p>Added genes go here! Click on a gene to remove it</a>
        </div>
        <input type=\'button\' id=\'submit-network\' value=\'Create Network\'></input>
			</form
		`
		return result
	};

	const displayCreateNetworkModal = function () {
		$("#createNetworkForm").remove();
    // get sources from database
		console.log("It gets here correctly")
		let sources = queryNetworkDatabase({type:"NetworkSource"})
		console.log(sources)
		$("#creatNetworkQuestions-container").append(createHTMLforForm(['source1', 'source2', 'source3']));
		$(CREATE_NETWORK_MODAL).modal("show");
	}

	const performNetworkCreation = function () {
		return function () {
			displayCreateNetworkModal();
		}
	}


	// $(CREATE_NETWORK_CLASS).one("click", performNetworkCreation());
	$("body").on("click", CREATE_NETWORK_CLASS, performNetworkCreation())
};
