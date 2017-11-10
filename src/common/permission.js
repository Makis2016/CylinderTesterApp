/**
 * 权限枚举
 */
export const Permission = {
    // 用户新增
    USER_INSERT: 'user:insert',
    // 用户修改
    USER_UPDATE: 'user:update',
    // 用户删除
    USER_DELETE: 'user:allocate',
    // 用户角色分配
    USER_ALLOCATE: 'user:delete',
    // 角色新增
    ROLE_INSERT: 'role:insert',
    // 角色修改
    ROLE_UPDATE: 'role:update',
    // 角色删除
    ROLE_DELETE: 'role:delete',
    // 角色权限分配
    ROLE_ALLOCATE: 'role:allocate',
    // 资源新增
    RESOURCE_INSERT: 'resource:insert',
    // 资源修改
    RESOURCE_UPDATE: 'resource:update',
    // 资源删除
    RESOURCE_DELETE: 'resource:delete',
    // 权限新增
    AUTHORITY_INSERT: 'authority:insert',
    // 权限修改
    AUTHORITY_UPDATE: 'authority:update',
    // 权限删除
    AUTHORITY_DELETE: 'authority:delete',
    // 权限资源分配
    AUTHORITY_ALLOCATE: 'authority:allocate',
    // 工艺文件新增
    CRAFT_INSERT:'craft:insert',
    // 工艺文件删除
    CRAFT_DELETE:'craft:delete',
    // 工艺文件详情
    CRAFT_DETAIL:'craft:detail',
    // 字典添加
    DICT_INSERT:'dict:insert',
    // 字典更新
    DICT_UPDATE:'dict:update',
    // 字典删除
    DICT_DELETE:'dict:delete'
};