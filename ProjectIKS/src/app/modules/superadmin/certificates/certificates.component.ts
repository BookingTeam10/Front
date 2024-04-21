import { Component } from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {SuperAdminService} from "../service/superadmin.service";

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
  loadTree:string;
  constructor(private adminService:SuperAdminService) {
    this.dataSource.data = TREE_DATA;
    this.adminService.getTree().subscribe({
      next: (data:any) => {

        this.loadTree = data;
        console.log("UDJEEE")
        console.log(this.loadTree);
      }});
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

