(() => {
  const data = {
    message: 'Hell!',
    todos: [
      {
        id: 1,
        title: '第一筆測試資料',
        date: '2018/06/04',
        time: '16:20',
        filename: 'text.word',
        comment: 'I am a superman.',
        isCompleted: false,
        isFavorite: false
      },
      {
        id: 2,
        title: '第二筆測試資料',
        date: '2018/06/05',
        time: '16:20',
        filename: 'text.word',
        comment: 'I am a superman.',
        isCompleted: false,
        isFavorite: false
      }
    ],
    cacheTitle: '',
    cacheTodo: {},
    visibility: 'all'
  };

  var app = new Vue({
    el: '#app',
    data: data,
    methods: {
      addTodo: function() {},
      editTodo(item) {
        this.cacheTitle = item.title;
        this.cacheTodo = item;
      },
      canceleEdit: function() {
        this.cacheText = '';
        this.cacheTodo = {};
      },
      getFiles(e, item) {
        console.log(e.target.files);
        item.filename = e.target.files[0].name;
      }
    },
    computed: {
      filteredTodos: function() {
        console.log(this.visibility);

        if (this.visibility === 'all') {
          return this.todos;
        }

        if (this.visibility === 'progress') {
          // console.log(this.todos.filter(item => !item.isDone));
          return this.todos.filter(item => !item.isCompleted);
        } else if (this.visibility === 'completed') {
          // console.log(this.todos.filter(item => item.isDone));
          return this.todos.filter(item => item.isCompleted);
        }
      }
    }
  });

  console.log(app);
})();
