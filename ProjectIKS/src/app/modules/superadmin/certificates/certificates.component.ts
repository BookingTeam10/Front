import { Component } from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {SuperAdminService} from "../service/superadmin.service";


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
  tree: any[] = [];
  constructor(private adminService:SuperAdminService) {
    //this.dataSource.data = TREE_DATA;
    console.log("UDJEEE")
    this.adminService.getTree().subscribe({
      next: (data:any) => {
        console.log("DATA1234")
        console.log(data.tree)

        let splitData = data.tree.split(" ");

        for (let i = 0; i < splitData.length-1; i++) {
          this.tree.push(splitData[i]);
        }
        console.log(this.tree)

      }});

  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  printNodeName(node:any) {
    console.log("NODE");
    console.log(node.name);
  }
}

  // const TREE_DATA: TreeNode[] = [
  // {
  //   name: 'Node 2',
  //   children: [
  //     {
  //       name: 'Child 3',
  //       children: [
  //         { name: 'Grandchild 1' },
  //         { name: 'Grandchild 2' }
  //       ]
  //     }
  //   ]
  // }
  // ];



