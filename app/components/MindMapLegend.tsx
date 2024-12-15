import React from "react";

const MindMapLegend: React.FC = () => {
  return (
    <ul className="space-y-2 text-sm">
      <li>• Single-click a node to view its detailed content</li>
      <li>• Click the arrow icon to expand or collapse child nodes</li>
      <li>
      • Right-click a node to automatically expand related topics and connections
      </li>
      <li>• Use mouse scroll wheel or pinch gesture for zoom control</li>
      <li>• Click and drag empty space to navigate the map</li>
      <li>• Export map data in JSON or Markdown format</li>
    </ul>
  );
};

export default MindMapLegend;
