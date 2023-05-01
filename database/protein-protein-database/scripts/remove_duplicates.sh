#!/bin/bash
output="../script-results/processed-loader-files/physical_interaction_no_dupe.csv"
source="../script-results/processed-loader-files/physical_interaction.csv"
awk '!x[$0]++' $source > $output