import { Nav, DropButton, Box, Text, Button, Tip, TextInput, Select, FileInput } from 'grommet';
import { Refresh, Checkmark } from 'grommet-icons';
import { useState } from 'react'
import '../App.css'

export default function Sidebar() {
    const [value, setValue] = useState();
    const [networkMode, setNetworkMode] = useState('Gene regulatory Network');
    return (
        <Box className='sidebar' pad="small" >
            <Text weight="bold">Network</Text>
            <Text weight="bold" size="small">Network Source</Text>
            <Text weight="bold" size="xsmall">Demo</Text>
            <Select
                plain
                options={['Demo #1: Unweighted GRN', 'Demo #2: Weighted GRN', 'Demo #3: Unweighted GRN', 'Demo #4: Weighted GRN', 'Demo #5: PPI']}
                value={value}
                placeholder="Select a Demo"
                onChange={({ option }) => setValue(option)}
                size="small"
            />

            {/* TODO: remove browse message */}
            <FileInput
                name="file"
                size="small"
                messages= {{ browse: ' ', dropPrompt: 'Open File'}}
                onChange={event => {
                    const fileList = event.target.files;
                    for (let i = 0; i < fileList.length; i += 1) {
                    const file = fileList[i];
                }
            }}
            />
            <Button className="load-from-database" margin={{ top: "small" }}><Text size="small">Load from Database</Text></Button>
            <Box margin={{ vertical: "9px" }} width="95%" alignSelf="center" border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
            <Button margin={{ left: "small" }} justify="between"><Refresh /><Text>Reload</Text></Button>
            <Box margin={{ vertical: "9px" }} width="95%" alignSelf="center" border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
            <Text weight="bold" size="xsmall">Network Mode</Text>
            <Select
                plain
                options={['Gene regulatory Network', 'Protein-protein Interaction Network']}
                value={networkMode}
                placeholder="Select a Network Mode"
                onChange={({ option }) => setNetworkMode(option)}
                size="small"
            />
            <Text size="small" weight="bold" >Species</Text>
            <Box direction="row"  ><Checkmark /><Text size="small">Saccharomyces cerevisiae</Text></Box>
        </Box>

    )
}