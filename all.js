(() => {
  const data = {
    todos: [{
        id: '1',
        title: '第一筆測試資料',
        date: '2018/02/04',
        time: '16:20',
        filename: 'text.word',
        comment: 'I am a superman.',
        isCompleted: false,
        isFavorite: true
      },
      {
        id: '2',
        title: '第二筆測試資料',
        date: '',
        time: '',
        filename: 'text.word',
        comment: 'I am a superman.',
        isCompleted: false,
        isFavorite: false
      },
      {
        id: '3',
        title: '第三筆測試資料',
        date: '2018/06/25',
        time: '16:20',
        filename: 'text.word',
        comment: 'I am a superman.',
        isCompleted: true,
        isFavorite: false
      },
      {
        id: '4',
        title: '第四筆測試資料',
        date: '2018/09/05',
        time: '16:20',
        filename: 'text.word',
        comment: '',
        isCompleted: false,
        isFavorite: true
      }
    ],
    isNewTodo: false,
    newTodo: {
      id: '',
      title: '',
      date: '',
      time: '',
      filename: '',
      comment: '',
      isCompleted: false,
      isFavorite: false
    },
    cacheTodo: {},
    visibility: 'all'
  };

  var app = new Vue({
    el: '#app',
    data: data,
    directives: {
      focus: {
        // 指令的定義
        inserted: function (el) {
          el.focus();
        }
      }
    },
    methods: {
      resetNewTodo(isNew) {
        this.isNewTodo = isNew;
        const timestamp = isNew ? Math.floor(Date.now()) : '';

        this.newTodo = {
          id: timestamp,
          title: '',
          date: '',
          time: '',
          filename: '',
          comment: '',
          isCompleted: false,
          isFavorite: false
        };
      },
      addTodo() {
        this.cacheTodo = {};
        this.resetNewTodo(true);
      },
      editTodo(item) {
        // this.cacheTitle = item.title;
        this.resetNewTodo(false);
        this.cacheTodo = JSON.parse(JSON.stringify(item));
      },
      cancelEdit() {
        this.resetNewTodo(false);
        this.cacheTodo = {};
      },
      saveTodo(item) {
        // console.log(item);

        if (item === null) {
          if (this.newTodo.title === '') return;
          this.todos.push(this.newTodo);
        } else {
          for (var key of Object.keys(this.cacheTodo)) {
            //使用Object.keys()方法取得物件的Key的陣列
            // console.log(key + ': ' + this.cacheTodo[key]);
            item[key] = this.cacheTodo[key];
          }
        }

        this.resetNewTodo(false);
        this.cacheTodo = {};
      },
      delTodo(delIndex) {
        this.todos.splice(delIndex, 1);
      },
      getFiles(e, item) {
        console.log(e.target.files);
        item.filename = e.target.files[0].name;
      },
      customFormatterDate(date) {
        return moment(date).format('MM/DD');
      }
    },
    computed: {
      filteredTodos: function () {
        // console.log(this.visibility);

        // 改用 Flex order 控制
        // this.todos.sort((a, b) => (a.isFavorite < b.isFavorite ? 1 : -1));

        // console.log(this.todos);

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

  // 拖拉功能
  Sortable.create(cardList, {
    handle: '.dragIcon',
    animation: 150,
    chosenClass: 'chosen'
  });
})();