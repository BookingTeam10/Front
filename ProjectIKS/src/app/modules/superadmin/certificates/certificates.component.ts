import { Component } from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";

//ovo cemo zameniti sa sertifikatom
interface TreeNode {
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent {
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}

  const TREE_DATA: TreeNode[] = [
  {
    name: 'Node 2',
    children: [
      {
        name: 'Child 3',
        children: [
          { name: 'Grandchild 1' },
          { name: 'Grandchild 2' }
        ]
      }
    ]
  }
  ];

