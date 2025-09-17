import { Nav, DropButton, Box, Text, Button, Tip, TextInput } from 'grommet';
import { Refresh, Checkmark } from 'grommet-icons';
export default function Navbar() {
    return (
        <Nav direction="row" flex="false" background="#dfebe5" pad={{ left:"15px"}} >
            <DropButton
                label="Network"
                dropAlign={{ top: 'bottom', left: 'left' }}
                pad="15px"
                hoverIndicator= {{ color: '#16693f', border: 'none'  } }
                border= {{ color: 'transparent' }}
                dropContent={
                    <Box pad={{ vertical: "5px" }} background="white" width="medium">
                        <Text weight="bold" margin={{ left: "small" }}>Network Source</Text>
                        {/* TODO: maybe instead do a collapsible instead of a tip */}
                        {/* TODO: something with pad or margin here is not working since content in tip displaying with wrong position */}
                        <Box pad={{ left: "12px"}}>
                            <Tip
                                plain
                                dropProps={{
                                    align: { left: "right", top: "top" }, // attach menu to the right side
                                }}
                                content={
                                    <Box
                                        pad="small"
                                        gap="small"
                                        // round="xsmall"
                                        background="white"
                                        // // elevation="small"
                                        fill="true"
                                    >
                                        <Button label="Demo #1: Unweighted GRN" onClick={() => {}} />
                                        <Button label="Demo #2: Weighted GRN" onClick={() => {}} />
                                        <Button label="Demo #3: Unweighted GRN" onClick={() => {}} />
                                        <Button label="Demo #4: Weighted GRN" onClick={() => {}} />
                                        <Button label="Demo #5: PPI" onClick={() => {}} />
                                    </Box>
                                }
                            >
                                <Button plain label="Demo" alignSelf='start' fill="horizontal" />
                            </Tip>
                        </Box>
                        <Box width="95%" alignSelf="center" margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        <Button margin={{ left: "small" }}><Text>Open File</Text> <Text>(.xlsx, .sif, .graphml)</Text></Button>
                        <Box width="95%" alignSelf="center" margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        <Button margin={{ left: "small" }}><Text>Load from Database...</Text></Button>
                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        <Button margin={{ left: "small" }} justify="between"><Refresh /><Text>Reload</Text></Button>
                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        <Text weight="bold" margin={{ left: "12px" }}>Network Mode</Text>
                        {/* TODO: only display checkmark if selected view */}
                        {/* TODO: need to display text in gray when disabled */}
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Checkmark /><Text>Gene Regulatory Network</Text></Button>
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>Protein-Protein Physical Interaction Network</Text></Button>
                        <Text weight="bold" margin={{ left: "12px" }}>Species</Text>
                        <Box direction="row" margin={{ horizontal: "20px" }} ><Checkmark /><Text>Saccharomyces cerevisiae</Text></Box>
                    </Box>
                }
            />

            <DropButton
                label="Layout"
                dropAlign={{ top: 'bottom', left: 'left' }}
                pad="15px"
                hoverIndicator= {{ color: '#16693f'} }
                dropContent={
                    <Box direction="column" pad={{ vertical: "5px" }} gap="small" background="white" width="medium">
                        <Box pad={{ left: "12px" }}><Text >Graph Options</Text></Box>
                        {/* TODO: maybe instead do a collapsible instead of a tip */}
                        <Button margin={{ horizontal: "45px", vertical: "3px" }}><Text>Force Graph</Text></Button>
                        <Button margin={{ horizontal: "45px", vertical: "3px" }}><Text>Grid Layout</Text></Button>
                        <Box margin={{ vertical: "9px" }}border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        <Button margin={{ horizontal: "45px", vertical: "3px" }}><Text>Lock Force Graph Parameters</Text></Button>
                        <Button margin={{ horizontal: "45px", vertical: "3px" }}><Text>Reset Force Graph Parameters</Text></Button>
                        <Button margin={{ horizontal: "45px", vertical: "3px" }}><Text>Undo Reset</Text></Button>
                        <Box margin={{ vertical: "9px" }}border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        {/* TODO: restrict size of text input and restrict to number values only */}
                        <Box margin={{ horizontal: "45px", vertical: "3px" }} direction='row'><Text>Link Distance (1 - 1000)</Text> <TextInput /></Box>
                        <Box margin={{ horizontal: "45px", vertical: "3px" }} direction='row'><Text>Charge (-2000 - 0)</Text> <TextInput /></Box>
                    </Box>
                }
            />

            <DropButton
                label="Node"
                dropAlign={{ top: 'bottom', left: 'left' }}
                pad="15px"
                hoverIndicator= {{ color: '#16693f'} }
                dropContent={
                    <Box direction="column" pad={{ vertical: "5px" }} background="white" width="medium">
                        <Box pad={{ horizontal: "20px", vertical: "3px" }}><Text margin={{ left: "12px" }}>Enable Node Coloring</Text></Box>
                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        {/* TODO: maybe instead do a collapsible instead of a tip */}
                        <Button margin={{ horizontal: "20px", vertical: "3px" }}><Text>Select Top Dataset</Text></Button>
                        <Button margin={{ horizontal: "20px", vertical: "3px" }}><Text><Checkmark />Average Replicate Values for Top Datset</Text></Button>
                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        <Button margin={{ horizontal: "20px", vertical: "3px" }}><Text>Select Bottom Dataset</Text></Button>
                        <Button margin={{ horizontal: "20px", vertical: "3px" }}><Text><Checkmark />Average Replicate Values for Bottom Datset</Text></Button>
                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        {/* TODO: restrict size of text input and restrict to number values only */}
                        <Box margin={{ horizontal: "20px", vertical: "3px" }} direction='row'><Text>Log Fold Change Max Value (0.01 - 100)</Text> <TextInput /></Box>
                    </Box>
                }
            />

            <DropButton
                label="Edge"
                dropAlign={{ top: 'bottom', left: 'left' }}
                pad="15px"
                hoverIndicator= {{ color: '#16693f'} }
                dropContent={
                    <Box direction="column" pad={{ vertical: "5px" }} background="white" width="medium">
                        <Box pad={{ horizontal: "20px", vertical: "3px" }}><Text margin={{ left: "12px" }}>Enable Edge Coloring Based on Weight Values </Text></Box>
                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        <Box pad={{horizontal: "20px", vertical: "3px"}}><Button pad={{ horizontal: "20px", vertical: "3px" }}><Text>Only Show Edge Weights With Mouse Over</Text></Button></Box>
                        <Box pad={{horizontal: "20px", vertical: "3px"}}><Button pad={{ horizontal: "20px", vertical: "3px" }}><Text>Always Show Edge Weights</Text></Button></Box>
                        <Box pad={{horizontal: "20px", vertical: "3px"}}><Button pad={{ horizontal: "20px", vertical: "3px" }}><Text>Never Show Edge Weights</Text></Button></Box>
                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        <Box margin={{ horizontal: "20px", vertical: "3px" }} direction='row'><Text>Edge Weight Normalization Factor (0.0001 - 1000)</Text> <TextInput /></Box>
                        <Box pad={{horizontal: "20px", vertical: "3px"}}><Button pad={{ horizontal: "20px", vertical: "3px" }}><Text>Reset Edge Weight Normalization Factor</Text></Button></Box>
                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        {/* TODO: restrict size of text input and restrict to number values only */}
                        <Box margin={{ horizontal: "20px", vertical: "3px" }} direction='row'><Text>Gray Edge Threshold (0 - 100%)</Text> <TextInput /></Box>
                        <Box pad={{horizontal: "20px", vertical: "3px"}}><Button pad={{ horizontal: "20px", vertical: "3px" }}><Text>Show Gray Edges as Dashed</Text></Button></Box>
                    </Box>
                }
            />

            <DropButton
                label="View"
                dropAlign={{ top: 'bottom', left: 'left' }}
                pad="15px"
                hoverIndicator= {{ color: '#16693f'} }
                dropContent={
                    <Box direction="column" pad={{ vertical: "5px" }} background="white" width="medium">
                        <Text margin={{ left: "small" }}>Viewport Size</Text>
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Checkmark /><Text>Small</Text></Button>
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>Medium</Text></Button>
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>Large</Text></Button>
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>Fit To Window</Text></Button>
                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>

                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>Restrict Graph to Viewport</Text></Button>

                        <Box margin={{ vertical: "9px" }} border={{ color: "#bbb", "side": "top", "style": "dotted", size: "1px" }} ></Box>
                        <Box margin={{ horizontal: "20px", vertical: "3px" }} direction='row'><Text>Zoom (25 - 200%)</Text> <TextInput /></Box>
                    </Box>
                }
            />

            <DropButton
                label="Export"
                dropAlign={{ top: 'bottom', left: 'left' }}
                pad="15px"
                hoverIndicator= {{ color: '#16693f'} }
                dropContent={
                    <Box direction="column" pad={{ vertical: "5px" }} background="white" width="medium">
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Checkmark /><Text>Export Data</Text></Button>
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>Export Image</Text></Button>
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>Print</Text></Button>
                    </Box>
                }
            />

            <DropButton
                className='nav-button'
                label="Help"
                dropAlign={{ top: 'bottom', left: 'left' }}
                pad="15px"
                hoverIndicator= {{ color: '#16693f'} }
                dropContent={
                    <Box direction="column" pad={{ vertical: "5px" }} background="white" width="medium">
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>Getting Started</Text></Button>
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>GRNsight Wiki</Text></Button>
                        <Button margin={{ horizontal: "20px", top: "3px" }}><Text>About GRNsight</Text></Button>
                    </Box>
                }
            />

            <DropButton
                className='nav-button'
                label="Demo"
                dropAlign={{ top: 'bottom', left: 'left' }}
                pad="15px"
                hoverIndicator= {{ color: '#16693f'} }
                dropContent={
                    <Box
                        pad="small"
                        gap="small"
                        size="medium"
                        // round="xsmall"
                        background="white"
                        // // elevation="small"
                        // fill="true"
                    >
                        <Button label="Demo #1: Unweighted GRN" onClick={() => {}} />
                        <Button label="Demo #2: Weighted GRN" onClick={() => {}} />
                        <Button label="Demo #3: Unweighted GRN" onClick={() => {}} />
                        <Button label="Demo #4: Weighted GRN" onClick={() => {}} />
                        <Button label="Demo #5: PPI" onClick={() => {}} />
                    </Box>
                }
            />

        </Nav>
    )
}