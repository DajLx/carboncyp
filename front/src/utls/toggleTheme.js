const getNodes = () => document.getElementById("root");
const tool = (nodes) => {
  if (nodes.className.includes("dark")) {
    nodes.className = nodes.className.split(" ")[0];
  } else {
    nodes.className += " dark";
  }
};
const toggleTheme = () => {
  const nodes = getNodes();
  tool(nodes);
};

export default toggleTheme;
