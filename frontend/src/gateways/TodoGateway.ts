export default interface TodoGateway {
  getTodos(): Promise<any>;
  addItem(item: any): Promise<any>;
  updateItem(id: string): Promise<any>;
  removeItem(id: string): Promise<any>;
}
