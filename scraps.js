<ul>
  <% todos.each(function (todo) { %>
    <li><a href="#/todos/<%= todo.get("id") %>"><%= todo.get("title")%></a></li>
  <% }) %>
</ul>


<tr>
  <td><%= todo.escape("id") %></td>
  <td>
    <% todos.each(function (todo) { %>
     <a href="#/todos/<%= todo.get("id") %>"><%= todo.get("title")%></a>
    <% }) %>
  </td>
</tr>



<% todos.each( function(todo) { %>
  <%= JST["todos/index_row"]({ todo: todo }) %>
<% }); %></tbody>