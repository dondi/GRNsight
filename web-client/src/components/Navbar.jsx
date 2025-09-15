import { DropButton, Box, Text, Menu } from 'grommet';
export default function Navbar() {
    return (
        <nav className="navbar">
            <DropButton
                label="Network"
                dropContent={
                    <Box direction="column" fill="horizontal">
                        <Text weight="bold">Network Source</Text>
                        <Menu label="Demo" dropAlign={{ top: 'bottom', bottom: 'top', left:'right', right: 'right' }} items={[
                            { label: 'Demo #1: Unweighted GRN', onClick: () => {} },
                            { label: 'Demo #2: Weighted GRN', onClick: () => {} },
                            { label: 'Demo #3: Unweighted GRN', onClick: () => {} },
                            { label: 'Demo #4: Weighted GRN', onClick: () => {} },
                            { label: 'Demo #5: PPI', onClick: () => {} }
                        ]} />

                    </Box>
                }
            />
            <div className="dropdown">Network
            <div className="dropdown-content">
                Network Source
                <div className="dropdown-submenu">Demo</div>
                <div>Open File</div>
                <div>Load from Database...</div>
                <div>Reload</div>
                <div>Network Mode</div>
                <div>Gene Regulatory Network</div>
                <div>Protein-Protein Physical Interaction Network</div>
                <div>Species</div>
                <div>Saccharomyces cerevisiae</div>
            </div>
            </div>
            <div className="dropdown">Layout
                <div className="dropdown-content">
                    Graph Options
                    <div>Force Graph</div>
                    <div>Grid Layout</div>
                    <div>Lock Force Graph Parameters</div>
                    <div>Reset Force Graph Parameters</div>
                    <div>Undo Reset</div>
                    <div>Link Distance (1 - 1000)</div>
                    <div>Charge (-2000 - 0)</div>
            </div>
            </div>
            <div className="dropdown">Node</div>
            <div className="dropdown">Edge</div>
            <div className="dropdown">View</div>
            <div className="dropdown">Export</div>
            <div className="dropdown">Help</div>
            <div className="dropdown">Demo</div>
        </nav>
    )
}